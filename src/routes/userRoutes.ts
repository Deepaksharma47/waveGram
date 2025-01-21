import { Router } from "express";
import authController from "../controller/authController";
import authValidation from "../validation/authValidation";
import { jwtAuthMiddleware } from "../middleware/jwtAuth";
import { constantValues } from "../constants";
import waveMediaUploader from "../middleware/multer.middlerware";

const userRoutes = Router()

userRoutes
    .post("/signup",authValidation.signupValidationSchema,authController.referrerRegister)
    .post("/login",authValidation.loginValidationSchema,authController.loginUser)
    .get("/my-profile" ,jwtAuthMiddleware([constantValues.roles.adminRole,constantValues.roles.superAdminRole]),authController.getProfile )
    .put("/update-profile",jwtAuthMiddleware([  constantValues.roles.adminRole]),authController.updateProfile)
    .post("/create-wave", jwtAuthMiddleware([constantValues.roles.adminRole]),waveMediaUploader.fields([{name:"wavePhoto"},{name:"waveVideo"}]),)

export default userRoutes
