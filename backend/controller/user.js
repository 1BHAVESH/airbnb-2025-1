import { User } from "../models/user.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/generateToken.js"

export const register = async(req, res) => {
    try {

        // console.log(req.body)

        const {name, email, password} = req.body

        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required."
            })
        }

        const user = await User.findOne({email})

        //  console.log(user)

        if(user){
            return res.status(400).json({
                success:false,
                message:"User Already Registerd With This Email"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({
            name,
            email,
            password: hashedPassword
        })

        return res.status(201).json({
            success:true,
            message:"User Created Successfully"
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Failed To Register"
        })
    }
}

export const Login = async(req, res) => {
    try {
        const {email, password} = req.body

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required."
            })
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                success:false,
                message:"incorrect email or password."
            })
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if(!isPasswordMatched){
            return res.status(400).json({
                success:false,
                message:"incorrect email or password."
            })
        }

        generateToken(res,user, `welecome back ${user.name}`)

    } catch (error) {
        console.log(error)
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Failed To Register"
        })
    }
}

export const getUserProfile = async(req, res) => {
    try {

        const userId = req.id;

        const user = await User.findById(userId).select("-password")

        if(!user){

            return res.status(404).json({
                message:"User Not Found",
                success:false
            })
        }

        return res.status(200).json({
            user,
            success:true
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Failed To Load User"
        })
    }
}