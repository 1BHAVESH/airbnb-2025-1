import express from "express"
import { PropertyListing } from "../controller/property controller/propertyListing.js"
import isAuthntiacted from "../middlewre/isAuthnticated.js"
import upload from "../utils/upload.js"
import { getListedProperty } from "../controller/property controller/getProperty.js"
import { PropertyInfo } from "../controller/property controller/getPropertInfo.js"
import { abc } from "../controller/property controller/abc.js"
import { bookingCreate } from "../controller/Booking/booking.js"
import { editProperty } from "../controller/property controller/editProperty.js"
import { getBookings } from "../controller/Booking/getBookings.js"
import { getPropteryByCategory } from "../controller/property controller/getPropteryByCategory.js"



const router = express.Router()

// router.route("/property-listing").post(isAuthntiacted,upload.array("images", 5), PropertyListing)
router.route("/property-listing").post(isAuthntiacted, upload, PropertyListing);
router.route("/proprties").get(getListedProperty)
router.route("/:id/property-info").get(isAuthntiacted, PropertyInfo)
router.route("/property-booking").post(isAuthntiacted, bookingCreate)
router.route("/:id/listing-update").post(isAuthntiacted, upload, editProperty) 
router.route("/bookings").get(isAuthntiacted, getBookings)
router.route("/proprties-category").get(isAuthntiacted, getPropteryByCategory)

  
export default router