import { constantValues } from "../constants";
import { AppError } from "../utils";


import Admin from "../models/admin.model";
import { sendMail } from "../config/mailConnect";
import { generateToken } from "./tokenServices";

const registerAdmin = async (user: any) => {
    const { firstName, lastName, email, password, roleId=1 } = user;
    const admin = await Admin.findOne({
        where: {
            email: user?.email,
            isActive: true
        }
    })
    if(admin){
        throw new AppError(constantValues.msg.alreadyExist,constantValues.msgCode.conflictCode);
    }

    const profilePhoto = `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`

    const newAdmin = await Admin.create({firstName,lastName,email,password,roleId,profilePhoto});

    // sendMail(email,"successfull Registeration", "<h3>welcome to the wavegram </h3>")

    return newAdmin
    
}


const loginAdmin = async (email:string,password:string) => {
    const admin = await Admin.findOne({where:{email:email, isDeleted:false}})
   
    if(!admin || !await admin.login(password)){

        throw new AppError(constantValues.msg.invalidCredentials,constantValues.msgCode.badRequest)
    }

    if(!admin.isActive){
        throw new AppError(constantValues.msg.inactiveUser,constantValues.msgCode.failureCode);
    }

    const token = await generateToken(admin)

    return {admin:admin.toSafeObject(), token}

}

const getProfile = async (id:number) => {
    const admin = await Admin.findOne({where:{id:id, isDeleted:false}})

    if(!admin){
        throw new AppError(constantValues.msg.internalServerError,constantValues.msgCode.badRequest)
    }

    return {admin:admin.toSafeObject()}
}


export default {
    registerAdmin,
    loginAdmin,
    getProfile
}