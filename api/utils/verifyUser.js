// Import the jsonwebtoken library for JWT operations
import jwt from 'jsonwebtoken';
// Import the errorHandler function from the error.js file
import { errorHandler } from './error.js';

// Define the verifyToken middleware function
export const verifyToken = (req, res, next) => {
  // Retrieve the JWT from the 'access_token' cookie in the request
  const token = req.cookies.access_token;

  // Check if the token is missing
  if (!token) return next(errorHandler(401, 'Unauthorized'));

  // Verify the JWT using the secret key stored in environment variables
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    // Check if an error occurred during JWT verification
    if (err) return next(errorHandler(403, 'Forbidden'));

    // If verification is successful, attach the user object from the token to the request object
    req.user = user;
    // Proceed to the next middleware or route handler
    next();
  });
};
