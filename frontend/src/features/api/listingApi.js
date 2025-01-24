import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const LISTING_API = "https://airbnb-2025-1.onrender.com/api/v1/listing";

export const listingApi = createApi({
  reducerPath: "listingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: LISTING_API,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    listingProperty: builder.mutation({
      query: ({ formData }) => {
        console.log(formData);
        return {
          url: "property-listing",
          method: "POST",
          body: formData,
        };
      },
    }),
    editProperty:builder.mutation({
      query: ({formData, id}) => {
        return{
          url: `/${id}/listing-update`,
          method: "POST",
          body: formData
        }
      }
    }),
    getAllPropertis: builder.query({
        query: () => {
            return{
                url: "/proprties",
                method: "GET"
            }
        }
    }),
    getPropteryByCategory: builder.query({
      query: ({category}) => {
        console.log("mmmmmmmmmmmm", category);
  return {
    url: `/proprties-category?category=${category}`,
    method: "GET"
  };}}),
    getPropetyDetail: builder.query({
      query: ({id}) => ({
        url: `/${id}/property-info`,
        method:"GET"
      })
    })
  }),
});

export const { useListingPropertyMutation, useGetAllPropertisQuery, useGetPropetyDetailQuery, useEditPropertyMutation, useGetPropteryByCategoryQuery } = listingApi;
