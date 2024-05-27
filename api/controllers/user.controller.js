// Import necessary modules and dependencies
import bcryptjs from 'bcryptjs'; // Import bcryptjs for hashing passwords
import User from '../models/user.model.js'; // Import the User model from the models directory
import { errorHandler } from '../utils/error.js'; // Import a custom error handler
import Listing from '../models/listing.model.js'; // Import the Listing model from the models directory

// Define a test function to check if the API route is working
export const test = (req, res) => {
  res.json({
    message: 'Api route is working!',
  });
};

// Define the updateUser function for updating a user's account
export const updateUser = async (req, res, next) => {
  // Ensure that the user can only update their own account
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can only update your own account!'));
  }
  try {
    // If the request includes a password, hash it before saving
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // Update the user with the new data from the request body
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true } // Return the updated user
    );

    // Destructure the password out of the user object and keep the rest
    const { password, ...rest } = updatedUser._doc;

    // Send a success response with status code 200 and the updated user data
    res.status(200).json(rest);
  } catch (error) {
    // Pass any errors to the next middleware (error handler)
    next(error);
  }
};

// Define the deleteUser function for deleting a user's account
export const deleteUser = async (req, res, next) => {
  // Ensure that the user can only delete their own account
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can only delete your own account!'));
  }
  try {
    // Delete the user by their ID
    await User.findByIdAndDelete(req.params.id);
    // Clear the access token cookie
    res.clearCookie('access_token');
    // Send a success response with status code 200
    res.status(200).json('User has been deleted!');
  } catch (error) {
    // Pass any errors to the next middleware (error handler)
    next(error);
  }
};

// Define the getUserListings function for retrieving a user's listings
export const getUserListings = async (req, res, next) => {
  // Ensure that the user can only view their own listings
  if (req.user.id === req.params.id) {
    try {
      // Find listings by the user's ID
      const listings = await Listing.find({ userRef: req.params.id });
      // Send a success response with status code 200 and the user's listings
      res.status(200).json(listings);
    } catch (error) {
      // Pass any errors to the next middleware (error handler)
      next(error);
    }
  } else {
    return next(errorHandler(401, 'You can only view your own listings!'));
  }
};

// Define the getUser function for retrieving a user's data
export const getUser = async (req, res, next) => {
  try {
    // Find the user by their ID
    const user = await User.findById(req.params.id);

    // If the user is not found, send a 404 error using the error handler
    if (!user) {
      return next(errorHandler(404, 'User not found!'));
    }

    // Destructure the password out of the user object and keep the rest
    const { password: pass, ...rest } = user._doc;

    // Send a success response with status code 200 and the user data
    res.status(200).json(rest);
  } catch (error) {
    // Pass any errors to the next middleware (error handler)
    next(error);
  }
};
