import { Host } from "../../models/host.js";
import { User } from "../../models/user.js";

export const HostCreate = async(req, res) => {
    try {

        console.log(req.body)

        
        
      
        const {bio, city, country, email, name, phone, profileImage, state, street, zipCode} = req.body

        const hostId = req.id

        console.log(name, city, bio, email, phone, zipCode,state)

        const user = await User.findById(hostId)

        const newHost = new Host({
            userId: hostId,
            name,
            email,
            phone, 
            address: {
                street,
                state,
                zipCode,
                city,
                country
            },
            bio,
            propertiesCount:1
        })

        console.log(newHost)

        if(newHost){
            newHost.verificationStatus = true
            await newHost.save()
        }

        await newHost.save()

        user.role = "host"

        await user.save()

        return res.json({
            message: "Host registerd successfully",
            success: true,
            
          });
        
    } catch (error) {
        return res.status(501).json({
            message: "Error Create Host",
            success: false,
            error: error.message,
          });
    }
}