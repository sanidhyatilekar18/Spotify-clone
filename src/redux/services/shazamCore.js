import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react';
  export const shazamCoreApi = createApi({
    reducerPath : 'shazamcoreApi',
    baseQuery : fetchBaseQuery({
      baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
      prepareHeaders: (headers) => {
         headers.set('x-rapidapi-key', 'cfb54861e8msh831df5f7f92a30ap16dd87jsn7b918a0ea364');
          headers.set('x-rapidapi-host', 'shazam-core.p.rapidapi.com');
         return headers;
      }
    }),
    endpoints: (builder)=>({
      getTopCharts:builder.query({
        query:(countryCode = 'DZ')=>'charts/world?country_code=' + countryCode,
      })
    })
  });

  export const {
    useGetTopChartsQuery,
  } = shazamCoreApi;