// Import the express library to create a router
import express from 'express';
// Import the listing controller functions for handling listing-related operations
import { createListing, deleteListing, updateListing, getListing, getListings } from '../controllers/listing.controller.js';
// Import the verifyToken middleware to authenticate users
import { verifyToken } from '../utils/verifyUser.js';

// Create a new router instance
const router = express.Router();

// Define a POST route for creating a new listing
// The verifyToken middleware authenticates the user before allowing access to the createListing function
router.post('/create', verifyToken, createListing);

// Define a DELETE route for deleting a listing by ID
// The verifyToken middleware authenticates the user before allowing access to the deleteListing function
router.delete('/delete/:id', verifyToken, deleteListing);

// Define a POST route for updating a listing by ID
// The verifyToken middleware authenticates the user before allowing access to the updateListing function
router.post('/update/:id', verifyToken, updateListing);

// Define a GET route for retrieving a single listing by ID
// No authentication is required to access the getListing function
router.get('/get/:id', getListing);

// Define a GET route for retrieving multiple listings
// No authentication is required to access the getListings function
router.get('/get', getListings);

// Export the router to use it in other parts of the application
export default router;
