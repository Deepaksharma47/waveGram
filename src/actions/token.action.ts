import { Axios } from "axios";
// import {removeQuotes} from "../utils/helpingFunction"

/******** Set Authorization Token ***********/
export const setAuthorizationToken = (axios:Axios): void => {
    const tokenLatest = getAccessToken();
    console.log("tokenLatest",tokenLatest, typeof(tokenLatest)) // Call without arguments
    if (tokenLatest) {
        axios.defaults.headers.common.Authorization = `Bearer ${tokenLatest}`; // Prefix token with "Bearer"
    }  else {
        delete axios.defaults.headers.common.Authorization;
    }
    
};

/******** Set Access Token in Storage ***********/
export const setAccessToken = (token: unknown): void => {
    if (token) {
                localStorage.setItem("token",JSON.stringify(token))
    } else {
                localStorage.removeItem('token');

    }
};

/******** Get Access Token from Storage ***********/
export const getAccessToken = (): unknown => {
    const localToken = JSON.parse(localStorage.getItem('token') as string);
    return  localToken;
};
