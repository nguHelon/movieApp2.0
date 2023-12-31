import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

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
        getSearchedActor: builder.query({ query: ({ searchTerm }) => `/search/person?query=${searchTerm}` }),
        getSearchedMovie: builder.query({ query: ({ movieSearchTerm }) => `/search/movie?query=${movieSearchTerm}` }),
        getGenreList: builder.query({ query: () => "/genre/movie/list" }),
        getMovieByGenre: builder.query({ query: ({ genreId }) => `/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}` }),
        getMovieDetail: builder.query({ query: ({ movieId }) => `/movie/${movieId}?language=en-US'` }),
        getMovieCast: builder.query({ query: ({ movieId }) => `/movie/${movieId}/credits` }),
        getMovieRecommendations: builder.query({ query: ({ movieId }) => `/movie/${movieId}/recommendations` }),
        getMovieKeywords: builder.query({ query: ({ movieId }) => `/movie/${movieId}/keywords` }),
        getContentRating: builder.query({ query: ({ movieId }) => `/movie/${movieId}/release_dates` }),
        getMovieTrailer: builder.query({ query: ({ movieId }) => `/movie/${movieId}/videos` }),
        getActorDetail: builder.query({ query: ({ actorId }) => `/person/${actorId}` }),
        getActorCredits: builder.query({ query: ({ actorId }) => `/person/${actorId}/movie_credits` })
    })
});

export const {
    useGetUpcomingMoviesQuery,
    useGetPopularMoviesQuery,
    useGetActorsQuery,
    useGetSearchedActorQuery,
    useGetSearchedMovieQuery,
    useGetGenreListQuery,
    useGetMovieByGenreQuery,
    useGetMovieDetailQuery,
    useGetMovieCastQuery,
    useGetMovieRecommendationsQuery,
    useGetMovieKeywordsQuery,
    useGetContentRatingQuery,
    useGetMovieTrailerQuery,
    useGetActorDetailQuery,
    useGetActorCreditsQuery
} = tmdbAPI;