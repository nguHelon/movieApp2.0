import MovieCard from "./MovieCard"
import { useGetUpcomingMoviesQuery } from "../store/services/tmdbAPI"
import Loader from "./Loader";

const Upcoming = () => {
  const { data, isFetching, error} = useGetUpcomingMoviesQuery();

  if (isFetching) return <Loader title="Loading Movies..." />

  return (
    <div className="flex-1">
        <div className="w-full flex justify-between items-center py-3 px-2">
            <div className="flex items-center justify-center">
                <h1 className="text-xl text-white font-bold flex md:text-2xl">Upcoming <span className="hidden ml-1 ss:block">Movies</span></h1>
                <div className="w-[1px] h-[20px] bg-lightGray2 mx-2"></div>
                <span className="text-md text-lightGray2">trailers</span>
            </div>
            <h1 className="text-sm text-lightGray2">All Upcoming Movies</h1>
        </div>
        <div className=" flex flex-wrap justify-center gap-3">
            {
                data?.results?.slice(0, 5).map(movie => {
                    return <MovieCard 
                        key={movie.id}
                        movieName={movie.original_title}
                        releaseDate={movie.release_date}
                        backdropPath={movie.backdrop_path}
                    />
                })
            }
        </div>
    </div>
  )
}

export default Upcoming