import mongoose from "mongoose";

// Listing Schema
const BookingSchema = new mongoose.Schema(
  { mainImg: {
    type: String,
    required: true
  },
    title: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required:true,
    },
   
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },

    guest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    checkIn: {
      type: String,
      required: true,
    },

    checkOut: {
      type: String,
      required: true,
    },

    totalAmout: {
      type: Number,
      required: true,
    },

    totalGuest: {
      type: Number,
      required: true,
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
const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;
