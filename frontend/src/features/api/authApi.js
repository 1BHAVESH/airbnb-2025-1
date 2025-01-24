import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { userLoggedIn } from "../authSlice"

const USER_API = "http://localhost:2020/api/v1/user/"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery : fetchBaseQuery({
        baseUrl: USER_API,
        credentials: "include"
    }),

    endpoints : (builder)=> ({
        registerUser: builder.mutation({
            query: (inputData) =>{
                console.log(inputData)
                
                return {
                    url: "register",
                    method: "POST",
                    body: inputData
                }
            }
        }),

        loginUser: builder.mutation({
            query: (inputData) => {
                // console.log(inputData);
                return {
                    url: "login",
                    method: "POST",
                    body: inputData,
                };
            },
            

            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try {
                    const result = await queryFulfilled;

                    console.log(result)
                   
                    dispatch(userLoggedIn({user: result.data.user}))
                } catch (error) {
                    console.log(error)
                }
            }
        }),

        loadUser: builder.query({
            query: () => ({
                url:"profile",
                method: "GET",
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try {
                    const result = await queryFulfilled;
                   
                    dispatch(userLoggedIn({user: result.data.user}))
                } catch (error) {
                    console.log(error)
                }
            }
        })
    })
})

export const {useRegisterUserMutation, useLoginUserMutation, useLoadUserQuery} = authApi