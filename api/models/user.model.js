// Import the mongoose library to interact with MongoDB
import mongoose from 'mongoose';

// Define a schema for the users using mongoose.Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,        // The username of the user
      required: true,      // This field is required
      unique: true,        // This field must be unique across all users
    },
    email: {
      type: String,        // The email address of the user
      required: true,      // This field is required
      unique: true,        // This field must be unique across all users
    },
    password: {
      type: String,        // The password of the user
      required: true,      // This field is required
    },
    avatar: {
      type: String,        // The URL of the user's avatar image
      default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",  // Default avatar image if none is provided
    },
  },
  { timestamps: true }     // Adds createdAt and updatedAt timestamps automatically
);

// Create a mongoose model for the User schema
const User = mongoose.model('User', userSchema);

// Export the User model to use it in other parts of the application
export default User;
