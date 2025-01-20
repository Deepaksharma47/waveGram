import { combineReducers } from "@reduxjs/toolkit";

import Auth from "../Slices/userSlice"

const  rootReducer = combineReducers({
    Auth,
})

export default rootReducer;
