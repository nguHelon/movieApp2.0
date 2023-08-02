import Loader from "../components/Loader";
import MovieCard from "../components/MovieCard"
import { useGetPopularMoviesQuery } from "../store/services/tmdbAPI"

const AllPopular = () => {
  const { data, isFetching } = useGetPopularMoviesQuery();

  if (isFetching) return <Loader title="Loading Popular Movies..." />

  return (
    <div className="w-full">
        <div className="w-full flex justify-start my-5">
            <h1 className="text-white font-bold text-2xl">More Popular Movies</h1>
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

export default AllPopular