import multer from "multer";
import fs from "node:fs";
import {v4 as uuidv4} from "uuid"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = "uploads"
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
            
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueName = uuidv4() + "." + file.originalname;
        cb(null, uniqueName  );
    }
})


const imagaeuploader = multer({
    storage:storage,
    limits:{
        fileSize: 1024*1024*45 // 45MB in bytes (45 * 1024 * 1024)
    },
    fileFilter:(req, file, cb) =>{
        const allowedExtensions = /\.(jpg|jpeg|png|pdf|webp|mpeg|mp3|mp4)$/i;

        if(!file.originalname.match(allowedExtensions)){
            if(file.fieldname === "document"){
                cb(new Error("please upload pdf and word only"))
            } else{
                cb(new Error("please upload and image"))
            }
        }
        else{
            cb(null, true);
        }

        // if(file.fieldname == "profileImage"){
        //     if(file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg"){
        //         cb(null , true);
        //     }
        //     else{
        //         cb(new Error("Only png,jpeg and jpg image formates are allowed"))
        //     }
        // }
        // else if(file.fieldname == "documentation"){
        //     if(file.mimetype === "application/pdf" || file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
        //         cb(null , true);
        //     }
        //     else{
        //         cb(new Error("Only pdf and docs files are allowed"));
        //     }
        // }
    }
})

export default  imagaeuploader;