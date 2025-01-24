import express from "express"
import { getUserProfile, Login, register } from "../controller/user.js"
import isAuthntiacted from "../middlewre/isAuthnticated.js"

const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(Login)
router.route("/profile").get(isAuthntiacted, getUserProfile)

export default router