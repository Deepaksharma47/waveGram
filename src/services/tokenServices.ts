import jwt from 'jsonwebtoken';
import { AdminAttributes } from '../interfaces/auth_interface';
import Token from '../models/token.model';
import { AppError } from '../utils';
import { constantValues } from '../constants';
import { promises } from 'dns';

const generateToken = async (user: AdminAttributes): Promise<string> => {
    if (!process.env.JWT_SECRET_KEY) {
        throw new AppError(constantValues.msg.secretKeyMissing, constantValues.msgCode.badRequest);
    }

    const payload = {
        id: user?.id,
        email: user?.email,
        roleId: user?.roleId,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: '1h',
    });

    await Token.create({ token: token, adminId: user?.id });

    return token;
};

const verifyTokenInDb = async (authHeader: string | undefined): Promise<boolean> => {
    if (!authHeader) return false;

    const token = authHeader.split(" ")[1];
    if (!token) return false;

    const tokenRecord = await Token.findOne({ where: { token } });
    return !!tokenRecord; // Return true if the token exists, false otherwise
};

const handleExpiredToken = async (authHeader: string | undefined): Promise<void> => {
    if (!authHeader) return;

    const token = authHeader.split(" ")[1];
    if (token) {
        const deleted = await Token.destroy({
            where: {
                token
            }
        });
        console.log(deleted ? "Expired token removed." : "Expired token not found.");
    }
};


interface UserDataPayLoad {
    email: string;
    firstName:string;
    lastName:string;
}

const createUserDataToken = async (payload:UserDataPayLoad) =>{
    if (!process.env.JWT_USER_DATA) {
        throw new AppError(constantValues.msg.secretKeyMissing, constantValues.msgCode.badRequest);
    }

    const token = jwt.sign(payload, process.env.JWT_USER_DATA);

    return token;
}


export { generateToken, verifyTokenInDb, handleExpiredToken,createUserDataToken };

