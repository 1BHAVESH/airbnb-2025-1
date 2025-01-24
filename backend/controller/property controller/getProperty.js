import Listing from "../../models/listing.js"

export const getListedProperty = async(req, res) => {
    try {

        const property = await Listing.find({})
        
        if(!property){
            return res.status(404).json({
                message:"Proprty not found"
            })
        }

        return res.status(200).json({
            message:"propert found",
            property
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:`${error.message}`
        })
    }
}