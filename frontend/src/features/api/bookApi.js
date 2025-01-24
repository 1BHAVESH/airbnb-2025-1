import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const HOST_API = "https://airbnb-2025-1.onrender.com/api/v1/listing";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: HOST_API,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    booking: builder.mutation({
      query: ({ bookingInfo }) => {
        console.log(bookingInfo);

        return {
          url: "property-booking",
          method: "POST",
          body: bookingInfo,
        };
      },
    }),

    getBookins: builder.query({
      query: () => {
        return {
          url: "bookings",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useBookingMutation, useGetBookinsQuery } = bookApi;
