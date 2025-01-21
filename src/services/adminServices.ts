import { constantValues } from "../constants";
import { AppError } from "../utils";
import { Op } from "sequelize";


import Admin from "../models/admin.model";
import { sendMail } from "../config/mailConnect";
import { generateToken } from "./tokenServices";
import Wave from "../models/wave.model";
import { WaveAttributes } from "../interfaces/interfaces";

const registerAdmin = async (user: any) => {
    const { firstName, lastName, email, password, roleId = 1 } = user;
    const admin = await Admin.findOne({
        where: {
            email: user?.email,
            isActive: true
        }
    })
    if (admin) {
        throw new AppError(constantValues.msg.alreadyExist, constantValues.msgCode.conflictCode);
    }

    const profilePhoto = `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`

    const newAdmin = await Admin.create({ firstName, lastName, email, password, roleId, profilePhoto });

    // sendMail(email,"successfull Registeration", "<h3>welcome to the wavegram </h3>")

    return newAdmin

}


const loginAdmin = async (email: string, password: string) => {
    const admin = await Admin.findOne({ where: { email: email, isDeleted: false } })

    if (!admin || !await admin.login(password)) {

        throw new AppError(constantValues.msg.invalidCredentials, constantValues.msgCode.badRequest)
    }

    if (!admin.isActive) {
        throw new AppError(constantValues.msg.inactiveUser, constantValues.msgCode.failureCode);
    }

    const token = await generateToken(admin)

    return { admin: admin.toSafeObject(), token }

}

const getProfile = async (id: number) => {
    const admin = await Admin.findOne({ where: { id: id, isDeleted: false } })

    if (!admin) {
        throw new AppError(constantValues.msg.internalServerError, constantValues.msgCode.badRequest)
    }

    return { admin: admin.toSafeObject() }
}

const updateProfile = async (id: number, data: any) => {
    let admin = await Admin.findOne({ where: { id: id, isDeleted: false, isActive: true } })

    if (!admin) {
        throw new AppError(constantValues.msg.userNotExist, constantValues.msgCode.failureCode)
    }

    await admin.update(data);

    return { admin: admin.toSafeObject() }
}

const createWave = async (req: any) => {
    const { id } = req.user;
    var waveVideo = null;
    var wavePhoto = null;

    const { waveMessage } = req.body;

    if (req?.files['wavePhoto']) {
        wavePhoto = req?.files?.wavePhoto[0]?.path
    }

    if (req?.files['waveVideo']) {
        waveVideo = req?.files?.waveVideo[0]?.path
    }

    const payload: WaveAttributes = {
        createdBy: id,
        waveVideo,
        wavePhoto,
        waveMessage,
        status: true
    }

    const createdWave = await Wave.create(payload)

    if (!createdWave) {
        throw new AppError(constantValues.msg.waveCreationFailed, constantValues.msgCode.failureCode)
    }

}

const getMyWave = async (req:any) =>{
    const { id } = req.user;
    const {search = "", page = 1, limit = 4} = req.query;
    const offset:any = (page - 1) * limit;

    const waves = await Wave.findAndCountAll({
        where: {
            createdBy: id, // Filter by the user ID
            waveMessage: {
                [Op.like]: `%${search}%`, // Filter by search term in waveMessage
            },
        },
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
        order: [['createdAt', 'DESC']],
        include: [
            {
                model: Admin,
                as: 'admin', // Alias as defined in the Wave model association 
            },
        ], // Order by creation date (latest first)
    });

    if(!waves){
        throw new AppError(constantValues.msg.waveFetchUnsuccessful,constantValues.msgCode.failureCode)
    }

    return {waves:waves.rows}
}


export default {
    registerAdmin,
    loginAdmin,
    getProfile,
    updateProfile,
    createWave,
    getMyWave
}