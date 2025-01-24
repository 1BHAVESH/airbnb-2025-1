import Listing from "../../models/listing.js";
import { deleteMedaiFromCloudinary, uploadMedia } from "../../utils/cloudinary.js";

export const editProperty = async (req, res) => {
  try {
    const { title, description, price, category, address, cordinate } = req.body;
    const listingId = req.params.id;

    let files = Array.isArray(req.files) ? req.files : Object.values(req.files).flat();

    const mainImage = files.find(file => file.fieldname === "mainImage");
    const images = files.filter(file => file.fieldname !== "mainImage");

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
        success: false,
      });
    }

    let mainImageThumb = listing.mainImage;
    if (mainImage) {
      if (listing.mainImage) {
        const publicId = listing.mainImage.split("/").pop().split(".")[0];
        await deleteMedaiFromCloudinary(publicId);
      }
      const mainImageResult = await uploadMedia(mainImage.path);
      mainImageThumb = mainImageResult?.secure_url;
    }

    let listingImages = listing.images;
    if (images.length > 0) {
      if (listing.images.length > 0) {
        for (const image of listing.images) {
          const publicId = image.split("/").pop().split(".")[0];
          await deleteMedaiFromCloudinary(publicId);
        }
      }
      const uploadPromises = images.map(img => uploadMedia(img.path));
      listingImages = (await Promise.all(uploadPromises)).map(res => res?.secure_url);
    }

    if (title || description || price || category || address || cordinate) {
      listing.title = title || listing.title;
      listing.description = description || listing.description;
      listing.price = price || listing.price;
      listing.category = category || listing.category;
      listing.address = address || listing.address;
      listing.cordinate = cordinate || listing.cordinate;
      listing.mainImage = mainImageThumb;
      listing.images = listingImages.length > 0 ? listingImages : listing.images;
      await listing.save();
    }

    return res.status(200).json({
      message: "Listing updated successfully",
      success: true,
      listing,
    });
  } catch (error) {
    console.error("Error updating property:", error);
    return res.status(500).json({
      message: "Error updating listing",
      success: false,
      error: error.message,
    });
  }
};
