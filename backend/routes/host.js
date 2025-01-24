import express from "express"

import isAuthntiacted from "../middlewre/isAuthnticated.js"
import { HostCreate } from "../controller/host/createHost.js"
import multer from "multer"
import { hostProfile } from "../controller/host/host-profile.js"
import { hostProperty } from "../controller/host/hostProperties.js"


const router = express.Router()
const upload = multer()

router.route("/host-register").post(isAuthntiacted, upload.none(), HostCreate)
router.route("/host-details").get(isAuthntiacted, hostProfile)
router.route("/host-property").get(isAuthntiacted, hostProperty)



export default router