import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {
  // Accessing the current user state from Redux store
  const { currentUser } = useSelector((state) => state.user);
  
  // Checking if there is a current user logged in
  // If there is, render the child routes (Outlet)
  // If not, navigate the user to the sign-in page
  return currentUser ? <Outlet /> : <Navigate to='/sign-in' />;
}
