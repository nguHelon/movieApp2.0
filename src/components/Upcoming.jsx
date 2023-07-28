import MovieCard from "./MovieCard"
import { useGetUpcomingMoviesQuery } from "../store/services/tmdbAPI"

const Upcoming = () => {
//   const { data, isFetching, error} = useGetUpcomingMoviesQuery();

  return (
    <div className="flex-1">
        <div className="w-full flex justify-between items-center py-3 px-2">
            <div className="flex items-center">
                <h1 className="text-2xl text-white font-bold">Upcoming Movies</h1>
                <div className="w-[1px] h-[20px] bg-lightGray2 mx-2"></div>
                <span className="text-md text-lightGray2">trailers</span>
            </div>
            <h1 className="text-sm text-lightGray2">All Upcoming Movies</h1>
        </div>
        <div className=" flex flex-wrap justify-center gap-3">
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
        </div>
    </div>
  )
}

export default Upcoming