import { Host } from "../../models/host.js";
import Listing from "../../models/listing.js";
import { uploadMedia } from "../../utils/cloudinary.js";

export const PropertyListing = async (req, res) => {
  try {
    // console.log(req.body)
    const { title, description, price, category, address, cordinate } = req.body;
    const hostId = req.id;

    console.log(hostId)

    const host = await Host.findOne({userId: hostId})

    console.log(host)

    if(!host){
      return res.status(404).json({
          message: "Host not Found",
          success: false
      })
  }

    

    const parsedCordinate = cordinate.split(",").map(Number);
    const geoCoordinates = [parsedCordinate[1], parsedCordinate[0]]; // Swap to [longitude, latitude]

    console.log(geoCoordinates)

    if (!parsedCordinate || parsedCordinate.length !== 2) {
      return res.json({
        message: "Coordinates must be in the format [latitude, longitude]",
        success: false,
      });
    }

    // Check if req.files is an object with nested arrays
    let files = [];

    if (Array.isArray(req.files)) {
      console.log("hii")
      files = req.files; // If it's already an array, use it directly
    } else {
      console.log("By")
      // If req.files is an object, use Object.values() to extract the arrays
      files = Object.values(req.files).flat();
    }

    // Check if at least one image is uploaded
    if (files.length === 0) {
      return res.json({
        message: "At least one image is required",
        success: false,
      });
    }

    // Find the main image (assuming it's in the field 'mainImage')
    const mainImage = files.find(file => file.fieldname === 'mainImage');
    const images = files.filter(file => file.fieldname !== 'mainImage'); 

    // Validation for other fields
    if (!title || !description || !price || !category || !address) {
      return res.json({
        message: "Required all fields",
        success: false,
      });
    }

    let listingImages = [];

    // Handle main image upload
    let mainImageUrl = null;
    if (mainImage) {
      const uploadedMainImage = await uploadMedia(mainImage.path);
      mainImageUrl = uploadedMainImage?.secure_url;
    }

    // Handle other images upload
    if (images && images.length > 0) {
      const uploadPromises = images.map(async (img) => {
        const uploadedImage = await uploadMedia(img.path);
        return uploadedImage?.secure_url;
      });

      listingImages = await Promise.all(uploadPromises);
    }

    console.log("New Listing Location:", {
      type: "Point",
      coordinates: geoCoordinates,
    });
    

    // Save the new listing
    const newListing = new Listing({
      title,
      description,
      address,
      price,
      images: listingImages, 
      mainImage: mainImageUrl,  // Store main image URL
      host: hostId,
      category,
      location: {
        type: "Point",
        coordinates: geoCoordinates
      }
    });

    await newListing.save();

    host.proptiesId.push(newListing.id)

    await host.save()
    return res.json({
      message: "Property listed successfully",
      success: true,
      listing: newListing,
    });
  } catch (error) {
    return res.json({
      message: "Error saving listing",
      success: false,
      error: error.message,
    });
  }
};






// import Listing from "../../models/listing.js";
// import { uploadMedia } from "../../utils/cloudinary.js";

// export const PropertyListing = async (req, res) => {
//   try {
//     console.log("dioo")
//     const { title, description, price, category, address } = req.body;

//     const host = req.id;

//     // console.log(req.files)

//     const mainImage = req.files.find(file => file.fieldname === 'mainImage'); // Identify main image
//     const images = req.files.filter(file => file.fieldname !== 'mainImage'); // Filter out mainImage

//     // console.log(images)

//     if (!title || !description || !price || !category || !address) {
//       return res.json({
//         message: "Required All fields",
//         success: false,
//       });
//     }

//     let listingImages = [];
//     let mainImageThumb;

//     console.log(images.length)

//     if (images && images.length > 0) {
//       console.log("yes")
//       // Use Promise.all to handle async image uploads
//       const uploadPromises = images.map(async (img) => {
//         const uploadedImage = await uploadMedia(img.path);
//         return uploadedImage?.secure_url;
//       });

//       // Wait for all image uploads to complete
//       listingImages = await Promise.all(uploadPromises);
//     }

//     if (mainImage) {
//       // Use Promise.all to handle async image uploads
//       const uploadPromises = await uploadMedia(mainImage.path)

//       // Wait for all image uploads to complete
//       mainImageThumb = uploadPromises?.secure_url
//     }


//     console.log("11111111111",listingImages)

//     const newListing = new Listing({
//       title,
//       description,
//       address,
//       price,
//       images: listingImages, // Multiple images URLs
//       mainImage: mainImageThumb,
//       host,
//       category
//     });

//     await newListing.save();
//     return res.json({
//       message: "Property listed successfully",
//       success: true,
//       listing: newListing,
//     });
//   } catch (error) {
//     return res.json({
//       message: "Error saving listing",
//       success: false,
//       error: error.message,
//     });
//   }
// };
