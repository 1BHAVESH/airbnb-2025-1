import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const HOST_API = "https://airbnb-2025-1.onrender.com/api/v1/host";

export const hostApi = createApi({
    reducerPath: "hostApi",
    baseQuery: fetchBaseQuery({
        baseUrl: HOST_API,
        credentials: "include"
    }),

    endpoints: (builder) => ({
        hostregister: builder.mutation({
            query: ({formData}) => {

                for (let [key, value] of formData.entries()) {
                    console.log(key, value);
                }
                
                return{
                    url: "/host-register",
                    method: "POST",
                    body: formData
                }
            }
        }),

        hostDetails: builder.query({
            query: () => {

                return{
                    url: "/host-details",
                    method: "GET"
                }
            }
        }),

        hostProrties: builder.query({
            query: () => {
                return {
                    url: "/host-property",
                    method:"GET"
                }
            }
        })
    })
})

export const {useHostregisterMutation, useHostDetailsQuery, useHostPrortiesQuery} = hostApi