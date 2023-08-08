import { Link, useParams } from "react-router-dom"
import { FcLink } from "react-icons/fc"
import { useGetMovieKeywordsQuery } from "../store/services/tmdbAPI"

const MoreMovieInfo = ({ movieData }) => {
  const { movieId } = useParams();
  const { data } = useGetMovieKeywordsQuery({ movieId });

  return (
    <div className="w-[350px]">
        <Link><FcLink /></Link>
        <div className="">
            <h1>Status</h1>
            <p>{movieData.status}</p>
        </div>
        <div className="">
            <h1>Original Language</h1>
            <p>{movieData.original_language}</p>
        </div>
        <div className="">
            <h1>Budget</h1>
            <p>${movieData.budget}</p>
        </div>
        <div className="">
            <h1>Revenue</h1>
            <p>{movieData.revenue}</p>
        </div>
        <div className="">
            {
                data?.keywords?.map(keyword => {
                    return (
                        <button key={keyword.id} className="">
                            {keyword.name}
                        </button>
                    )
                })
            }
        </div>
    </div>
  )
}

export default MoreMovieInfo