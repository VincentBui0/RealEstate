// Import necessary modules and dependencies
import Listing from '../models/listing.model.js'; // Import the Listing model from the models directory
import { errorHandler } from '../utils/error.js'; // Import a custom error handler

// Define the createListing function for creating a new listing
export const createListing = async (req, res, next) => {
  try {
    // Create a new listing with the data from the request body
    const listing = await Listing.create(req.body);
    // Send a success response with status code 201 and the created listing
    return res.status(201).json(listing);
  } catch (error) {
    // Pass any errors to the next middleware (error handler)
    next(error);
  }
};

// Define the deleteListing function for deleting a listing
export const deleteListing = async (req, res, next) => {
  // Find the listing by its ID from the request parameters
  const listing = await Listing.findById(req.params.id);

  // If the listing is not found, send a 404 error using the error handler
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }

  // Check if the user is authorized to delete the listing
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only delete your own listings!'));
  }

  try {
    // Delete the listing by its ID
    await Listing.findByIdAndDelete(req.params.id);
    // Send a success response with status code 200
    res.status(200).json('Listing has been deleted!');
  } catch (error) {
    // Pass any errors to the next middleware (error handler)
    next(error);
  }
};

// Define the updateListing function for updating a listing
export const updateListing = async (req, res, next) => {
  // Find the listing by its ID from the request parameters
  const listing = await Listing.findById(req.params.id);

  // If the listing is not found, send a 404 error using the error handler
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }

  // Check if the user is authorized to update the listing
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only update your own listings!'));
  }

  try {
    // Update the listing with the data from the request body
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated listing
    );
    // Send a success response with status code 200 and the updated listing
    res.status(200).json(updatedListing);
  } catch (error) {
    // Pass any errors to the next middleware (error handler)
    next(error);
  }
};

// Define the getListing function for retrieving a single listing
export const getListing = async (req, res, next) => {
  try {
    // Find the listing by its ID from the request parameters
    const listing = await Listing.findById(req.params.id);

    // If the listing is not found, send a 404 error using the error handler
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }

    // Send a success response with status code 200 and the listing
    res.status(200).json(listing);
  } catch (error) {
    // Pass any errors to the next middleware (error handler)
    next(error);
  }
};

// Define the getListings function for retrieving multiple listings
export const getListings = async (req, res, next) => {
  try {
    // Set default values for pagination and filtering
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    
    // Process the offer filter
    let offer = req.query.offer;
    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }

    // Process the furnished filter
    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }

    // Process the parking filter
    let parking = req.query.parking;
    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    // Process the type filter
    let type = req.query.type;
    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }

    // Set the search term, sort field, and order
    const searchTerm = req.query.searchTerm || '';
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'desc';

    // Find listings based on the provided filters and pagination
    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order }) // Sort the listings
      .limit(limit) // Limit the number of listings
      .skip(startIndex); // Skip listings for pagination

    // Send a success response with status code 200 and the found listings
    return res.status(200).json(listings);
  } catch (error) {
    // Pass any errors to the next middleware (error handler)
    next(error);
  }
};
