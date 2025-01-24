import mongoose from "mongoose";

export const connectDB = async() => {
    try {
     
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connect to DB")
    } catch (error) {
        console.log(error)
    }
}