import { createSlice } from "@reduxjs/toolkit";
import { adminInterface } from "../interfaces/interfaces";

interface  IState {
    userType : number | null;
    token : string | null;
    user : adminInterface | null;
    isLoading  : boolean;
    isLoggedIn : boolean;
    
}

const intilaState:IState = {
    userType:  null,
    token:  localStorage.getItem("token"),
    user:   null,
    isLoading:false,
    isLoggedIn: false,
}

const userSlice = createSlice({
    name:"Auth",
    initialState: intilaState,
    reducers:{
        setUserType:(state,value) =>{
            state.userType = value.payload;

        },

        setUser:(state,value) =>{
            state.user = value.payload;
            state.isLoggedIn =  true;

        },
        logout:(state) => {
            state.token = null;
            state.userType = null;
            state.user = null;
            localStorage.clear();
            sessionStorage.clear();
            state.isLoggedIn = false;
            state.isLoading = false;
        },
        setLoading:(state,value) =>{
            state.isLoading = value.payload;
        },
        setLoggedIn:(state,value) => {
            state.isLoggedIn = value.payload;
        }
    }
})

export const {setUserType,setUser,logout,setLoggedIn,setLoading} = userSlice.actions;

export default userSlice.reducer;