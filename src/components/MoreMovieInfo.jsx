import { Link, useParams } from "react-router-dom"
import { FcLink } from "react-icons/fc"
import { useGetMovieKeywordsQuery } from "../store/services/tmdbAPI"

const MoreMovieInfo = ({ movieData }) => {
  const { movieId } = useParams();
  const { data } = useGetMovieKeywordsQuery({ movieId });

  return (
    <div className="w-full flex flex-wrap items-start justify-start space-x-3 sm:block">
        <div className="w-full flex flex-wrap items-start gap-3 sm:block">
            <Link to={`${movieData.homepage}`}><FcLink className="text-3xl" /></Link>
            <div className="mb-4">
                <h1 className="text-white font-bold">Status</h1>
                <p className="text-lightGray2">{movieData.status}</p>
            </div>
            <div className="mb-4">
                <h1 className="text-white font-bold">Original Language</h1>
                <p className="text-lightGray2">{movieData.original_language}</p>
            </div>
            <div className="mb-4">
                <h1 className="text-white font-bold">Budget</h1>
                <p className="text-lightGray2">${movieData.budget}</p>
            </div>
            <div className="mb-4">
                <h1 className="text-white font-bold">Revenue</h1>
                <p className="text-lightGray2">${movieData.revenue}</p>
            </div>
        </div>
        <div className="">
            <h1 className="text-white font-bold">Keywords</h1>
            <div className="w-full flex flex-wrap items-center gap-1">
                {
                    data?.keywords?.map(keyword => {
                        return (
                            <button key={keyword.id} className="outline-none bg-lightGray1 text-black rounded-full px-2 py-1 text-[12px] md:px-3 md:text-[15px]">
                                {keyword.name}
                            </button>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default MoreMovieInfo