import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch(); // Accessing Redux dispatch function
  const navigate = useNavigate(); // Accessing the navigation function from React Router

  // Function to handle Google sign-in button click
  const handleGoogleClick = async () => {
    try {
      // Creating Google authentication provider instance
      const provider = new GoogleAuthProvider();
      
      // Getting authentication instance from Firebase app
      const auth = getAuth(app);
      
      // Signing in with Google popup window
      const result = await signInWithPopup(auth, provider);

      // Sending user data to server for authentication
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      // Parsing response from server
      const data = await res.json();

      // Dispatching action to Redux store to update user state
      dispatch(signInSuccess(data));

      // Navigating to home page after successful sign-in
      navigate('/');
    } catch (error) {
      console.log('could not sign in with google', error);
    }
  };

  // Rendering Google sign-in button
  return (
    <button
      onClick={handleGoogleClick}
      type='button'
      className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
    >
      Continue with google
    </button>
  );
}