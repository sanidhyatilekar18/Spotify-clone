import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://shazam-core.p.rapidapi.com/v1/";

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",

  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set('x-rapidapi-key', 'd9dc26866bmshea6140f7f280585p103236jsna27bfa0b3a9c');
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
getArtistDetails: builder.query({
  query: (artistId) => `artists/details?artist_id=${artistId}`,
}),
getSongsByGenreAndCountry: builder.query({
  query: ({ genre, country }) => ({
    url: 'charts/genre-world',
    params: {
      genre_code: genre,
      country_code: country,
    },
  }),
}),
 getSongsBySearch: builder.query({
    query: (searchTerm) =>
      `search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}&offset=0`,
  }),


  }),
});

export const { useGetTopChartsQuery, useGetArtistDetailsQuery, useGetSongsByCountryQuery, useGetSongsByGenreAndCountryQuery, useGetSongsBySearchQuery } = shazamCoreApi;
