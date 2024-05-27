// Import the express library to create a router
import express from 'express';
// Import the authentication controller functions
import { google, signOut, signin, signup } from '../controllers/auth.controller.js';

// Create a new router instance
const router = express.Router();

// Define a POST route for user signup
// When a POST request is made to /signup, the signup function from the auth controller is called
router.post("/signup", signup);

// Define a POST route for user signin
// When a POST request is made to /signin, the signin function from the auth controller is called
router.post("/signin", signin);

// Define a POST route for Google authentication
// When a POST request is made to /google, the google function from the auth controller is called
router.post('/google', google);

// Define a GET route for user signout
// When a GET request is made to /signout, the signOut function from the auth controller is called
router.get('/signout', signOut);

// Export the router to use it in other parts of the application
export default router;
