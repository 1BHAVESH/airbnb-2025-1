import {createSlice} from"@reduxjs/toolkit";

const initialState = {
    user:null,
    isAuthnicated:false,
   taxes: false
}

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers:{
        userLoggedIn: (state, action) => {
            state.user = action.payload.user;
            state.isAuthnicated = true
        },

        userLoggedOut: (state) => {
            state.user = null;
            state.isAuthnicated = false
        },
        setTaxes: (state, action) => {
            console.log(action.payload)
            state.taxes = action.payload
        }
    }

})

export const {userLoggedIn, userLoggedOut, setTaxes} = authSlice.actions
export default authSlice.reducer