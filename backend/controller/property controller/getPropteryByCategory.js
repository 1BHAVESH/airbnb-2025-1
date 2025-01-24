import Listing from "../../models/listing.js";

export const getPropteryByCategory = async (req, res) => {
    try {

        const { category } = req.query;
        console.log(req.query)
        const properties = await Listing.find({category: category})

        if(!properties){
            return res.json({
                message: "No property found",
                success: false,
            });
        }

        return res.json({
            message: "Property found",
            success: true,
            properties: properties,
        });
        
    } catch (error) {
        return res.json({
            message: "Error finding property by category",
            success: false,
            error: error.message,
          });
    }
}