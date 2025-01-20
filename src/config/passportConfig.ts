import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { AppError } from "../utils";
import { constantValues } from "../constants";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token from Authorization header
  secretOrKey: process.env.JWT_SECRET_KEY as string,        // Secret key to verify the token
};

const verifyCallback = async (jwtPayload: any, done: Function) => {
  try {
    // Validate the token payload and fetch user information if necessary
    if (!jwtPayload || !jwtPayload.id) {
      return done(null, false); // No user in the payload
    }

    // Example: Simulate user lookup (replace with DB query if needed)
    const user = {
      id: jwtPayload.id,
      email: jwtPayload.email,
      roleId: jwtPayload.roleId,
    };

    return done(null, user); // Pass user to middleware
  } catch (err) {
    return done(err, false); // Handle errors
  }
};

// Use the JwtStrategy in Passport
passport.use(new JwtStrategy(options, verifyCallback));

export default passport;








// import passport from "passport"

// import {Strategy as BearerStrategy} from "passport-http-bearer"
// import jwt, {JwtPayload} from "jsonwebtoken"
// import {AppError} from "../utils"
// import { constantValues } from "../constants";


// const verifyToken = async (token: string): Promise<any> => {
//     try {
//       // Verify the JWT token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
//       // You can also validate the decoded payload or fetch the user from DB
//       console.log(decoded)
//       return { id: decoded.id, username: decoded.name, email:decoded.email, userType:decoded.userType };
//     } catch (err:any) {
//       if(err.name === "TokenExpiredError" ){
//         throw new AppError(constantValues.msg.expiredToken, constantValues.msgCode.badRequest)
//       }
//       else{
//         throw new AppError(constantValues.msg.invalidToken, constantValues.msgCode.badRequest)
//       }
//     }
//   };

// passport.use("bearer",
//    new BearerStrategy(async (token, done) => {
//     console.log('tokentoken',token)
//         try{ 
//             const user = await verifyToken(token);                                                                                               
//             if(!user){
//                 return  done(null, false);
//             }
//             return done(null,user)
//         }
//         catch(err){
//             return done(err)
//         }
//     })
// )

// export default passport;