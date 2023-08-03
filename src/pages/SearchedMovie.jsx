import { useState } from "react"
import { useGetSearchedMovieQuery } from "../store/services/tmdbAPI";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";

const SearchedMovie = () => {
  const [movieSearchTerm, setMovieSearchTerm] = useState("");
  const {data, isFetching} = useGetSearchedMovieQuery({ movieSearchTerm })

  return (
    <div className="w-full absolute top-0 left-0">
      <div className="w-full flex items-center justify-center py-5 border-b border-lightGray1">
        <div className="w-5/6 xs:w-2/3 flex items-center">
          <input 
            onChange={(e) => {
              setMovieSearchTerm(e.target.value)
            }}
            className="flex-1 h-10 rounded-full bg-black/40 pl-3 text-mainorange outline-none border border-lightGray1"
            type="text"
            placeholder="search for movie"
          />           
        </div>
      </div>

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
    </div>
  )
}

export default SearchedMovie