import Booking from "../../models/book.js";
import { Host } from "../../models/host.js";

export const hostProfile = async (req, res) => {
  try {
    const hostId = req.id;

    const host = await Booking.find({ host: hostId });

    if (!host) {
      return res.status(404).json({
        message: "host not found",
        success: false,
      });
    }

    console.log(host)

    const totalAmount = host.reduce((sum, booking) => sum + booking.totalAmout, 0);

    return res.status(200).json({
        message: "host details",
        host,
        totalAmount,
        success: true,
      });

  } catch (error) {
    return res.status(501).json({
      message: "Failed to fetch earnings and accepted host",
      success: false,
      error: error.message,
    });
  }
};
