import Booking from "../../models/book.js";

export const getBookings = async (req, res) => {
    try {

        const guestId = req.id;
        
        const bookings = await Booking.find({guest:guestId})

        console.log(bookings);

        if(!bookings){
            return res.status(404).json({
                message: "No booking found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Booking fetched successfully",
            bookings,
            success: true,
        });
        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Fetch booking failed",
            error: error.message,
            success: false,
        });
    }
}