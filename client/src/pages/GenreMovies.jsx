import { Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import MovieCardFallback from "../components/MovieCardFallback";
import { useGetMovieByGenreQuery } from "../store/services/tmdbAPI";

// Dynamic imports
const MovieCard = lazy(() => import("../components/MovieCard"))

const GenreMovies = () => {
    const {genreId, genreName} = useParams();
    const {data} = useGetMovieByGenreQuery({ genreId });

    return (
        <div className="w-full px-5 py-7">
            <div className="w-full">
                <div className="w-full flex items-center justify-start mb-4">
                    <h1 className="text-white font-bold text-2xl">{`${genreName}`} Movies</h1>
                </div>
                <div className="w-full flex justify-center items-center gap-2 flex-wrap">
                    {
                        data?.results?.map((movie) => {
                            if (movie.backdrop_path) return (
                                <Suspense key={movie.id} fallback={<MovieCardFallback />}>
                                    <MovieCard                                        
                                        movieId={movie.id}
                                        releaseDate={movie.release_date}
                                        movieName={movie.original_title}
                                        backdropPath={movie.backdrop_path}
                                    />
                                </Suspense>
                            )
                        })
                    }
                </div>
            </div>
        </div>
  )
}

export default GenreMovies