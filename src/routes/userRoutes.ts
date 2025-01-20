import { Router } from "express";
import authController from "../controller/authController";
import authValidation from "../validation/authValidation";
import { jwtAuthMiddleware } from "../middleware/jwtAuth";
import { constantValues } from "../constants";

const userRoutes = Router()

userRoutes
    .post("/signup",authValidation.signupValidationSchema,authController.referrerRegister)
    .post("/login",authValidation.loginValidationSchema,authController.loginUser)
    .get("/my-profile" ,jwtAuthMiddleware(constantValues.roles.adminRole),authController.getProfile )

export default userRoutes
