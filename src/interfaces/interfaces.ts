import { ReactNode } from "react";
export interface iconBtn {
    text: string;
    onClick?: () => void;
    children?: ReactNode;     
    disabled?: boolean;       
    outline?: boolean;         
    customClasses?: string;    
    type?: "button" | "submit" | "reset";
}

export interface signupInterface{
    firstName:string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface  loginInterface{
    email:string;
    password:string;
}

export interface otpInterface{
    email:string,
    otp:string;
}

export interface adminInterface {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    dob?: string | null; // Optional property
    gender?: string | null; // Optional property
    mobileNumber?: string | null; // Optional property
    profilePhoto?: string | null; // Optional property
    address?: string | null; // Optional property
    city?: string | null; // Optional property
    state?: string | null; // Optional property
    zipCode?: string | null; // Optional property
    roleId: number;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
  }
  

export interface RootState {
    Auth: {
        user: adminInterface  ;
        isLoggedIn?:boolean;
        isLoading?:boolean;
        token?:string|null
    },
}

export interface PropState {
    user? : adminInterface | null;
}


export interface BasicDetailInterface {
    firstName: string ;
    lastName: string;
    email: string;
    dob?: string | null; // Optional property
    mobileNumber?: string | null; // Optional property
    address?: string | null; // Optional property
    city?: string | null; // Optional property
    state?: string | null; // Optional property
    zipCode?: string | null;
}


// wave interface

export interface WaveInterface {
    id: number;
    adminId:number;
    waveMessage:string;
    wavePhoto?:string;
    createdBy?:number;
    admin:adminInterface;
    status : boolean
}


// friendlist interface
export interface FriendListInterface {
    friend1:number;
    friend2:number;
    status:boolean;
    createdAt: string;
    updatedAt: string;
    admin:adminInterface
}