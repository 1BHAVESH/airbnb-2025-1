import Listing from "../../models/listing.js"

export const PropertyInfo = async(req, res) => {
    try {
        console.log(req.params)

        const propertyId = req.params.id

        const proprty = await Listing.findById(propertyId)

        if(!proprty){
            return res.status(404).json({
                message:"Proprty not found"
            })
        }

        return res.status(200).json({
            message:"propert found",
            proprty
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:`${error.message}`
        })
    }
}