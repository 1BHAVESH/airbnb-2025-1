import { authApi } from "@/features/api/authApi";
import{combineReducers} from "@reduxjs/toolkit";
import authReducer from "../features/authSlice.js"
import { listingApi } from "@/features/api/listingApi.js";
import { hostApi } from "@/features/api/hostApi.js";
import { bookApi } from "@/features/api/bookApi.js";


const rootReducer = combineReducers({
[authApi.reducerPath]:authApi.reducer,
[listingApi.reducerPath]:listingApi.reducer,
[hostApi.reducerPath]:hostApi.reducer,
[bookApi.reducerPath]:bookApi.reducer,
auth: authReducer
})

export default rootReducer