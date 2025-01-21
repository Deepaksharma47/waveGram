import passport from "../config/passportConfig";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils";
import { constantValues } from "../constants";

// Middleware for role-based JWT authentication
export const jwtAuthMiddleware = (allowedRoles: Array<number>) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("jwt", { session: false }, (err: any, user: any) => {
    console.log("user",user)
    if (err || !user) {
      // Handle authentication failure
      throw new AppError(
        constantValues.msg.inactiveUser,
        constantValues.msgCode.unAuthorizedUser
      );
    }

    // Check user role
    if (allowedRoles.includes(user.roleId)) {
      req.user = user; // Attach user to the request
      return next();   // Proceed to the next middleware
    }

    // Role mismatch
    throw new AppError(
      constantValues.msg.unAuthorizedUser,
      constantValues.msgCode.unAuthorizedUser
    );
  })(req, res, next); // Call Passport strategy
};


// const jwtSuperAdmin = catchAsyncError( async (req:Request, res:Response, next:NextFunction    ) => {
//     passport.authenticate("bearer",{session:false}, (err:any, user:any, info:any) =>{
//         if(err) {
//             return next(err)
//         }
//         if(!user) { 
//             return res.status(401).json({error:"Unauthorized"})
//         }
//         if(user.userType === "superAdmin"){
//             req.user = user;
//             next();
//         }
//         else{
//             throw new AppError(constantValues.msg.invalidCredentials,constantValues.msgCode.badRequest)
//         }

//     }) 
// })  

// const jwtUser = catchAsyncError( async (req:Request, res:Response, next:NextFunction    ) => {
//     passport.authenticate("bearer",{session:false}, (err:any, user:any, info:any) =>{
//         if(err) {
//             return next(err)
//         }
//         if(!user) { 
//             return res.status(401).json({error:"Unauthorized"})
//         }
//         if(user.userType === "user"){
//             req.user = user;
//             next();
//         }
//         else{
//             throw new AppError(constantValues.msg.invalidCredentials,constantValues.msgCode.badRequest)
//         }

//     }) 
// }) 


// export default {
//     jwtAuthMiddelware,
//     jwtSuperAdmin,
// }