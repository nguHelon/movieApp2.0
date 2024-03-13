import { lazy, Suspense } from "react";
import { useGetUpcomingMoviesQuery } from "../store/services/tmdbAPI"
import MovieCardFallback from "./MovieCardFallback";
import Loader from "./Loader";
import { Link } from "react-router-dom";

// Dynamic imports
const MovieCard = lazy(() => import("./MovieCard"))

const Upcoming = () => {
  const { data, isFetching} = useGetUpcomingMoviesQuery();

  if (isFetching) return <Loader title="Loading Movies..." />

  return (
    <div className="flex-1">
        <div className="w-full flex justify-between items-center py-3 px-2">
            <div className="flex items-center justify-center">
                <h1 className="text-xl text-white font-bold flex md:text-2xl">Upcoming <span className="hidden ml-1 ss:block">Movies</span></h1>
                <div className="w-[1px] h-[20px] bg-lightGray2 mx-2"></div>
                <span className="text-md text-lightGray2">trailers</span>
            </div>
            <Link to="/upcomingMovies">
                <h1 className="text-sm text-lightGray2">All Upcoming Movies</h1>
            </Link>
        </div>
        <div className=" flex flex-wrap justify-center">
            {
                data?.results?.slice(0, 5).map(movie => {
                    if (movie.backdrop_path) return (
                        <Suspense key={movie.id} fallback={<MovieCardFallback />}> 
                            <MovieCard 
                                key={movie.id}
                                movieId={movie.id}
                                movieName={movie.original_title}
                                releaseDate={movie.release_date}
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

export default Upcoming