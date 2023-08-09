import { Link, useParams } from "react-router-dom"
import { useGetMovieRecommendationsQuery } from "../store/services/tmdbAPI"

const MovieRecommendation = () => {
  const { movieId } = useParams();
  const { data } = useGetMovieRecommendationsQuery({ movieId });

  return (
    <div className="flex items-center justify-start space-x-3  py-4 overflow-x-scroll horizontal-scrollbar">
        {
            data?.results?.slice(0, 12).map(movie => {
                if (movie.backdrop_path) return (
                    <Link key={movie.id} to={`/movieInfo/${movie.id}`}>
                        <div className="flex-none w-[300px] h-auto">
                            <div className="w-full h-4/5">
                                <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt="" className="w-full h-full rounded-xl" />
                            </div>
                            <div className="w-full flex justify-between items-center mt-2">
                                <h1 className="text-white font-semibold truncate">{movie.original_title}</h1>
                                <p className="text-lightGray2 font-medium text-sm">{movie.release_date.split("-")[0]}</p>
                            </div>
                        </div>
                    </Link>
                )
            })
        }
    </div>
  )
}

export default MovieRecommendation