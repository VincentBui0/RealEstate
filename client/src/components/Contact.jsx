import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact({ listing }) {
  // Define state variables for landlord and message
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');

  // Function to handle changes in the message input
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  // Effect hook to fetch landlord information when the listing userRef changes
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        // Fetch landlord information from the backend API
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        // Update landlord state with fetched data
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]); // Dependence on listing.userRef ensures the effect runs when the userRef changes

  return (
    <>
      {/* Render contact information and message input only when landlord data is available */}
      {landlord && (
        <div className='flex flex-col gap-2'>
          <p>
            Contact <span className='font-semibold'>{landlord.username}</span>{' '}
            for{' '}
            <span className='font-semibold'>{listing.name.toLowerCase()}</span>
          </p>
          {/* Textarea for entering the message */}
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full border p-3 rounded-lg'
          ></textarea>
          {/* Link to open default email client with pre-filled message */}
          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}
