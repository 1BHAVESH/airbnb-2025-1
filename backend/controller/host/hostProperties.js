import { Host } from "../../models/host.js";

export const hostProperty = async(req, res) => {
    try {

        const hostId = req.id

        const host = await Host.findOne({userId: hostId}).populate({path: "proptiesId"})

        console.log(host)

        if(!host){
            return res.status(404).json({
                message: "Host not Found",
                success: false
            })
        }

        // const properties = await host.populate({path: "proptiesId"})

        // if(!properties){
        //     return res.status(404).json({
        //         message: "properties not found",
        //         success: false
        //     })
        // }

        return res.status(200).json({
            host,
            message: "properties found",
            success: true
        })


        
    } catch (error) {
        return res.status(500).json({
            message: "Error to fetch host properties",
            success: false,
            error: error.message,
          });
    }
}