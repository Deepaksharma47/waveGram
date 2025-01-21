// wave attributes
export interface WaveAttributes {
    id ? : number;
    wavePhoto?:string;
    waveVideo?:string;
    status : boolean;
    waveMessage :  string;
    createdBy : number;
}

// waveCommentAttributes {
export interface WaveCommentAttributes {
    id : number;
    comment : string;
    waveId : number;
    adminId : number;
    deletedAt :  Date;
}


// create wavepayload interface

