import { Suspense, lazy } from "react";
import { useGetPopularMoviesQuery } from "../store/services/tmdbAPI"
import MovieCardFallback from "../components/MovieCardFallback";

// Dynamic imports
const MovieCard = lazy(() => import("../components/MovieCard"));

const AllPopular = () => {
  const { data } = useGetPopularMoviesQuery();

  return (
    <div className="w-full">
        <div className="w-full flex justify-start my-5">
            <h1 className="text-white font-bold text-2xl">More Popular Movies</h1>
        </div>
        <div className="w-full flex flex-wrap justify-center gap-3">
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
  )
}

export default AllPopular