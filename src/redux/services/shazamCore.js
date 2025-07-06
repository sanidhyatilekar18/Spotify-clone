import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Base URL for the Shazam Core API
const baseUrl = "https://shazam-core.p.rapidapi.com/v1/";

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",

  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set('x-rapidapi-key', 'f17a1c58f5mshd644c048da5e3cfp187a6bjsn4cd6a0822317');
      headers.set('x-rapidapi-host', 'shazam-core.p.rapidapi.com');
      return headers;
    },
  }),

  endpoints: (builder) => ({
   getTopCharts: builder.query({
  query: (countryCode = "IN") => `charts/country?country_code=${countryCode}`,
}),
 getArtistDetails: builder.query({
    query: (artistId) => `/v2/artists/details?artist_id=${artistId}`,
  }),
  getSongsByCountry: builder.query({
  query: (countryCode) => `charts/country?country_code=${countryCode}`,
}),

  }),
});

export const { useGetTopChartsQuery, useGetArtistDetailsQuery, useGetSongsByCountryQuery } = shazamCoreApi;
