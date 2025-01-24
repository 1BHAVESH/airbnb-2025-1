import mongoose from "mongoose";

// Listing Schema
const ListingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    mainImage: {
      type: String,
    },
    images: [
      {
        type: String, // URLs for the images
      },
    ],
    amenities: {
      type: [String], // Array of amenities (e.g., WiFi, Pool, Kitchen, etc.)
    },
    availability: {
      type: Boolean, // true = available, false = unavailable
      default: true, // Default to all-time available
    },

    // Correct way to define bookingDate
    bookingDate: {
      checkIn: { type: Date }, // Date type for checkIn
      checkOut: { type: Date }, // Date type for checkOut
    },
    
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['apartment', 'house', 'villa', 'cabin', 'bungalow', 'island', 'icons', 'countryside', 'camping', 'arctic', 'beaches', 'historical', 'forest', 'rooms', 'castles'], // Categories of properties
    },
    location: {
      type: {
        type: String,
        enum: ["Point"], // GeoJSON type
        required: true, // Ensure the type is always defined
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true, // Ensure coordinates are mandatory
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);
// Create the Listing Model
const Listing = mongoose.model('Listing', ListingSchema);

export default Listing
