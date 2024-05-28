// Import the express library to create the Express application
import express from 'express';
// Import mongoose for interacting with MongoDB
import mongoose from 'mongoose';
// Import dotenv to manage environment variables
import dotenv from 'dotenv';
// Import routers for handling user, auth, and listing routes
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
// Import cookie-parser to parse cookies attached to the client request
import cookieParser from 'cookie-parser';
// Import path module to work with file and directory paths
import path from 'path';

// Load environment variables from a .env file into process.env
dotenv.config();

// Connect to MongoDB using the connection string from environment variables
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!'); // Log success message on successful connection
  })
  .catch((err) => {
    console.log(err); // Log any errors that occur during connection
  });

// Resolve the directory name of the current module's file
const __dirname = path.resolve();

// Create a new Express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse cookies attached to the client request
app.use(cookieParser());

// Start the server on port 3000 and log a message on success
app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

// Define routes for user, auth, and listing operations
// All routes prefixed with /api/user will be handled by userRouter
app.use('/api/user', userRouter);
// All routes prefixed with /api/auth will be handled by authRouter
app.use('/api/auth', authRouter);
// All routes prefixed with /api/listing will be handled by listingRouter
app.use('/api/listing', listingRouter);

// Serve static files from the client/dist directory
app.use(express.static(path.join(__dirname, '/client/dist')));

// Catch-all route to serve the index.html file for any route not handled above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Error-handling middleware to handle any errors that occur during request handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500; // Use error status code if available, otherwise default to 500
  const message = err.message || 'Internal Server Error'; // Use error message if available, otherwise default message
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
