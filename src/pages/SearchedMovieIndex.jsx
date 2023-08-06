import { useOutletContext } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";
import { useGetSearchedMovieQuery } from "../store/services/tmdbAPI";

const SearchedMovieIndex = () => {
  const [ movieSearchTerm ] = useOutletContext();
  const {data, isFetching} = useGetSearchedMovieQuery({ movieSearchTerm });

  return (
    <div className="w-full px-5 py-7">
        <div className="w-full">
            <div className="w-full flex items-center justify-start mb-4">
                <h1 className="text-white font-bold text-2xl">Search results for {`"${movieSearchTerm}"`}</h1>
            </div>
            <div className="w-full flex justify-center items-center gap-2 flex-wrap">
                { isFetching ? <Loader /> :
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
    </div>
  )
}

export default SearchedMovieIndex;