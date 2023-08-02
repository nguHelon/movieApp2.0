import MovieCard from "../components/MovieCard"
import { useGetUpcomingMoviesQuery } from "../store/services/tmdbAPI"
import Loader from "../components/Loader"

const AllUpcoming = () => {
  const { data, isFetching } = useGetUpcomingMoviesQuery();

  if (isFetching) return <Loader title="Loading Upcoming movies..." />

  return (
    <div className="w-full">
        <div className="w-full flex justify-start my-5">
            <h1 className="text-white font-bold text-2xl">More Upcoming Movies</h1>
        </div>
        <div className="w-full flex flex-wrap justify-center gap-3">
            {
                data?.results?.map((movie) => {
                    if (movie.backdrop_path) return <MovieCard 
                        key={movie.id}
                        releaseDate={movie.release_date}
                        movieName={movie.original_title}
                        backdropPath={movie.backdrop_path}
                    />
                })
            }
        </div>
    </div>
  )
}

export default AllUpcoming