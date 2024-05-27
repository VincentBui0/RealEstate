// Import the mongoose library to interact with MongoDB
import mongoose from 'mongoose';

// Define a schema for the listings using mongoose.Schema
const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,         // The name of the listing
      required: true,       // This field is required
    },
    description: {
      type: String,         // A description of the listing
      required: true,       // This field is required
    },
    address: {
      type: String,         // The address of the listing
      required: true,       // This field is required
    },
    regularPrice: {
      type: Number,         // The regular price of the listing
      required: true,       // This field is required
    },
    discountPrice: {
      type: Number,         // The discounted price of the listing (if any)
      required: true,       // This field is required
    },
    bathrooms: {
      type: Number,         // The number of bathrooms in the listing
      required: true,       // This field is required
    },
    bedrooms: {
      type: Number,         // The number of bedrooms in the listing
      required: true,       // This field is required
    },
    furnished: {
      type: Boolean,        // Indicates if the listing is furnished
      required: true,       // This field is required
    },
    parking: {
      type: Boolean,        // Indicates if the listing has parking available
      required: true,       // This field is required
    },
    type: {
      type: String,         // The type of listing (e.g., sale, rent)
      required: true,       // This field is required
    },
    offer: {
      type: Boolean,        // Indicates if there is an offer on the listing
      required: true,       // This field is required
    },
    imageUrls: {
      type: Array,          // An array of image URLs for the listing
      required: true,       // This field is required
    },
    userRef: {
      type: String,         // Reference to the user who created the listing
      required: true,       // This field is required
    },
  },
  { timestamps: true }      // Adds createdAt and updatedAt timestamps automatically
);

// Create a mongoose model for the Listing schema
const Listing = mongoose.model('Listing', listingSchema);

// Export the Listing model to use it in other parts of the application
export default Listing;
