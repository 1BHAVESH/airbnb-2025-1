import dotenv from"dotenv"
dotenv.config({})
import express from "express"
import { connectDB } from "./database/dbConnection.js";
import userRoute from "./routes/user.js"
import listingRoute from "./routes/listing.js"
import hostRoute from "./routes/host.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import bodyParser from "body-parser"
import path from "path"


const app = express()

const PORT = process.env.PORT || 3001;

const __dirname = path.resolve()

//default middlewere 
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())

app.use(cors({
    origin: "https://airbnb-2025-1.onrender.com",
    credentials: true
}))

app.use("/api/v1/user", userRoute)
app.use("/api/v1/listing", listingRoute)
app.use("/api/v1/host", hostRoute)

app.use(express.static(path.join(__dirname, "/frontend/dist")))
app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
})

app.listen(PORT, ()=> {
    console.log(`Server listning at this port ${PORT}`)
    connectDB()
})