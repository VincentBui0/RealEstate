// Import necessary modules and dependencies
import User from '../models/user.model.js'; // Import the User model from the models directory
import bcryptjs from 'bcryptjs'; // Import bcryptjs for hashing passwords
import { errorHandler } from '../utils/error.js'; // Import a custom error handler
import jwt from 'jsonwebtoken'; // Import jsonwebtoken for generating JWT tokens

// Define the signup function for creating a new user
export const signup = async (req, res, next) => {
  // Extract username, email, and password from the request body
  const { username, email, password } = req.body;

  // Hash the user's password using bcryptjs with a salt of 10 rounds
  const hashedPassword = bcryptjs.hashSync(password, 10);

  // Create a new user instance with the provided username, email, and hashed password
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    // Save the new user to the database
    await newUser.save();

    // Send a success response with status code 201
    res.status(201).json('User created successfully!');
  } catch (error) {
    // Pass any errors to the next middleware (error handler)
    next(error);
  }
};

// Define the signin function for authenticating a user
export const signin = async (req, res, next) => {
  // Extract email and password from the request body
  const { email, password } = req.body;

  try {
    // Find a user by their email address
    const validUser = await User.findOne({ email });

    // If no user is found, send a 404 error using the error handler
    if (!validUser) return next(errorHandler(404, 'User not found!'));

    // Compare the provided password with the stored hashed password
    const validPassword = bcryptjs.compareSync(password, validUser.password);

    // If the password is invalid, send a 401 error using the error handler
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));

    // Generate a JWT token with the user's ID and a secret from environment variables
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    // Destructure the password out of the user object and keep the rest
    const { password: pass, ...rest } = validUser._doc;

    // Set a cookie with the token and send the user data in the response
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    // Pass any errors to the next middleware (error handler)
    next(error);
  }
};

// Define the google function for handling Google sign-in/sign-up
export const google = async (req, res, next) => {
  try {
    // Find a user by their email address
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      // If user exists, generate a JWT token and send it in a cookie
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      // If user doesn't exist, generate a random password
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      // Hash the generated password
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      // Create a new user with the provided details
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4), // Create a unique username
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo, // Store the user's avatar photo
      });

      // Save the new user to the database
      await newUser.save();

      // Generate a JWT token and send it in a cookie
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    // Pass any errors to the next middleware (error handler)
    next(error);
  }
};

// Define the signOut function for logging out a user
export const signOut = async (req, res, next) => {
  try {
    // Clear the access token cookie
    res.clearCookie('access_token');

    // Send a success response with status code 200
    res.status(200).json('User has been logged out!');
  } catch (error) {
    // Pass any errors to the next middleware (error handler)
    next(error);
  }
};
