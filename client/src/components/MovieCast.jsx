import { Link, useParams } from "react-router-dom";
import  { useGetMovieCastQuery } from "../store/services/tmdbAPI"

const MovieCast = () => {
    const { movieId } = useParams();
    const { data } = useGetMovieCastQuery({ movieId });

    return (
        <div className="w-full flex items-center justify-start space-x-3 py-4 overflow-x-scroll horizontal-scrollbar">
            {
                data?.cast?.slice(0, 15).map(credit => {
                    return (
                        <Link key={credit.id} to={`/actorInfo/${credit.id}`}>
                            <div className="flex-none w-[150px] p-[6px] rounded-lg bg-secondaryGray">
                                <div className="w-full h-1/2">
                                    <img src={`https://image.tmdb.org/t/p/original${credit.profile_path}`} alt="" className="w-full h-full rounded-lg mb-2" />
                                </div>
                                <h1 className="text-white font-semibold text-xl truncate">{credit.original_name}</h1>
                                <p className="text-lightGray2 font-medium truncate">{credit.character}</p>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default MovieCast