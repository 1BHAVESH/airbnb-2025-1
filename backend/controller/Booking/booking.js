import Booking from "../../models/book.js";
import { Host } from "../../models/host.js";
import Listing from "../../models/listing.js";
import { User } from "../../models/user.js";

export const bookingCreate = async (req, res) => {
  try {
    const { address, checkIn, checkOut, title, totalPrice, totalguest, hostId, propertyId, mainImg } = req.body;
    console.log({ address, checkIn, checkOut, title, totalPrice, totalguest, hostId, propertyId })
    // Assume guestId comes from authenticated user
    const guestId = req.id; // Ensure userId is coming from middleware/auth

    // Find the property by ID
    const property = await Listing.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        message: "Property not found",
        success: false,
      });
    }

    // Create a new booking
    const newBooking = new Booking({
      title,
      address,
      checkIn,
      checkOut,
      totalAmout: totalPrice,
      totalGuest: totalguest,
      host: hostId,
      guest: guestId,
      propertyId: propertyId,
      mainImg: mainImg
    });

    // Update property with booking dates
    property.bookingDate = {
      checkIn: checkIn,
      checkOut: checkOut, 
    };

    const user = await User.findById(guestId)

    if (!user) {
        return res.status(404).json({
          message: "user not found",
          success: false,
        });
      }

    user.totalBooking = newBooking._id

    const host = await Host.findOne({userId: hostId})
 
    console.log(host)
    if (!host) {
        return res.status(404).json({
          message: "host not found",
          success: false,
        });
      }


    host.totalBooking = newBooking._id

    // Save both booking and updated property
    await newBooking.save();
    await property.save();
    await user.save()
    await host.save()

    // Return success response
    return res.status(201).json({
      message: "Booking created successfully",
      success: true,
      booking: newBooking,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating booking",
      success: false,
      error: error.message,
    });
  }
};
