import db from "../models";
import { catchAsyncError } from "../middleware";
import userServices from "../services/adminServices";
import { constantValues } from "../constants";


const referrerRegister = catchAsyncError(async (req, res) => {
    const result = await userServices.registerAdmin(req.body);
    res.status(constantValues.msgCode.successCode).json({
        success: constantValues.msgType.successStatus,
        message: constantValues.msg.signUpMessage,
        data:result
    })
});

const loginUser = catchAsyncError(async (req, res) => {
    const {email, password} = req.body;
    const {admin, token} = await userServices.loginAdmin(email, password);
    res.status(constantValues.msgCode.successCode).json({
        success: constantValues.msgType.successStatus,
        message: constantValues.msg.loginSuccess,
        token,
        data:admin
    })
})

const getProfile = catchAsyncError(async(req,res) =>{
    const user : any = req.user
    const {admin} = await  userServices.getProfile(user?.id);
    res.status(constantValues.msgCode.successCode).json({
        success: constantValues.msgType.successStatus,
        message: constantValues.msg.profileFetch,
        data:admin
    })
})

const  updateProfile = catchAsyncError(async(req,res) =>{
    const user : any = req.user;
    const {admin} = await userServices.updateProfile(user?.id, req.body)
    res.status(constantValues.msgCode.successCode).json({
        success: constantValues.msgType.successStatus,
        message: constantValues.msg.profileUpdate,
        data:admin
    })
})

const  createWave = catchAsyncError(async(req,res) =>{
    await userServices.createWave(req)
    res.status(constantValues.msgCode.successCode).json({
        success: constantValues.msgType.successStatus,
        message: constantValues.msg.profileUpdate,

    })
})

const getMyWave = catchAsyncError(async(req,res) =>{
    const {waves} =await userServices.getMyWave(req);
    res.status(constantValues.msgCode.successCode).json({
        success: constantValues.msgType.successStatus,
        message: constantValues.msg.waveFetchSuccessfully,
        data: waves
    })
})

const inviteFriend = catchAsyncError(async(req,res) =>{
    await userServices.inviteFriend(req);
    res.status(constantValues.msgCode.successCode).json({
        success: constantValues.msgType.successStatus,
        message: constantValues.msg.waveFetchSuccessfully,
    })
})




export default {
    referrerRegister,
    loginUser,
    getProfile,
    updateProfile,
    createWave,
    getMyWave,
    inviteFriend
}