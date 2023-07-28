import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// const options = {
//     method: 'GET',
//     headers: {
//         accept: 'application/json',
//         Authorization: 'Bearer fa1ef563179d6939e07ef1901aec8204'
//     }
// };

// fetch('https://api.themoviedb.org/3/discover/movie', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));


export const tmdbAPI = createApi({
    reducerPath: "tmdbAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.themoviedb.org/3",
        prepareHeaders: (headers) => {
            headers.set("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTFlZjU2MzE3OWQ2OTM5ZTA3ZWYxOTAxYWVjODIwNCIsInN1YiI6IjYzZDEwMjcxY2I3MWI4MDA4NWRkMWVhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GFORMLkhBq4MYqs5R8HP3kUbrj17SEQtafg5ecl3FAs");

            return headers;
        }
    }),
    endpoints: (builder) => ({
        getUpcomingMovies: builder.query({ query: () => "/movie/upcoming" }),
        getPopularMovies: builder.query({ query: () => "/movie/popular" }),
        getActors: builder.query({ query: () => "/person/popular" }),
    })
});

export const {
    useGetUpcomingMoviesQuery,
    useGetPopularMoviesQuery,
    useGetActorsQuery,
} = tmdbAPI;