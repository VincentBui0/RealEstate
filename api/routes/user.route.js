// Import the express library to create a router
import express from 'express';
// Import user controller functions for handling user-related operations
import { deleteUser, test, updateUser, getUserListings, getUser } from '../controllers/user.controller.js';
// Import the verifyToken middleware to authenticate users
import { verifyToken } from '../utils/verifyUser.js';

// Create a new router instance
const router = express.Router();

// Define a GET route for testing the API
// When a GET request is made to /test, the test function from the user controller is called
router.get('/test', test);

// Define a POST route for updating a user by ID
// The verifyToken middleware authenticates the user before allowing access to the updateUser function
router.post('/update/:id', verifyToken, updateUser);

// Define a DELETE route for deleting a user by ID
// The verifyToken middleware authenticates the user before allowing access to the deleteUser function
router.delete('/delete/:id', verifyToken, deleteUser);

// Define a GET route for retrieving all listings of a user by user ID
// The verifyToken middleware authenticates the user before allowing access to the getUserListings function
router.get('/listings/:id', verifyToken, getUserListings);

// Define a GET route for retrieving a user's details by user ID
// The verifyToken middleware authenticates the user before allowing access to the getUser function
router.get('/:id', verifyToken, getUser);

// Export the router to use it in other parts of the application
export default router;
