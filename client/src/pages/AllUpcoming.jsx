import { Suspense, lazy } from "react";
import MovieCardFallback from "../components/MovieCardFallback";
import { useGetUpcomingMoviesQuery } from "../store/services/tmdbAPI"

// Dynamic import
const MovieCard = lazy(() => import("../components/MovieCard"))

const AllUpcoming = () => {
  const { data } = useGetUpcomingMoviesQuery();

  return (
    <div className="w-full">
        <div className="w-full flex justify-start my-5">
            <h1 className="text-white font-bold text-2xl">More Upcoming Movies</h1>
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

export default AllUpcoming