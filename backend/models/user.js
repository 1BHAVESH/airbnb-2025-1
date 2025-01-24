import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
       
      },
      role: {
        type: String,
        enum: ['guest', 'host'],
        default: 'guest',
      },
      profilePicture: {
        type: String,
        default: '', // Optional: default profile image
      },

      totalBooking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
       
      }
     
    }, {timestamps: true})

    export const User = mongoose.model("User", userSchema)