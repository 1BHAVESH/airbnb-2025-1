import mongoose from "mongoose";

const hostSchema = new mongoose.Schema({
  // Host's Personal Information
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to User
  name: { type: String, required: true }, // Full Name of the Host
  email: { type: String, required: true }, // Email Address
  phone: { type: String, required: true }, // Phone Number
  profileImage: { type: String }, // URL of Host's Profile Image

  // Host's Address Details
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: String, required: true },
  },

  // Other Details
  dateOfJoining: { type: Date, default: Date.now }, // When the Host Joined
  bio: { type: String }, // Short Bio or Description About the Host
  verificationStatus: { type: Boolean, default: false }, // Whether Host is Verified
  propertiesCount: { type: Number, default: 0 }, // Number of Properties Managed by the Host
  proptiesId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing"
  }],
  totalBooking: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
  }],
});

export const Host = mongoose.model("Host", hostSchema);
