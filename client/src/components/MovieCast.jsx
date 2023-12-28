import { Link, useParams } from "react-router-dom";
import  { useGetMovieCastQuery } from "../store/services/tmdbAPI"
import { useState } from "react";
import { black } from "../assets";

const MovieCast = () => {
    const { movieId } = useParams();
    const { data } = useGetMovieCastQuery({ movieId });
    const [imgLoading, setImgLoading] = useState(true);

    return (
        <div className="w-full flex items-center justify-start space-x-3 py-4 overflow-x-scroll horizontal-scrollbar">
            {
                data?.cast?.slice(0, 15).map(credit => {
                    return (
                        <Link key={credit.id} to={`/actorInfo/${credit.id}`}>
                            <div className="flex-none w-[150px] p-[6px] rounded-lg bg-secondaryGray">
                                <div className="w-full h-1/2">
                                    <img 
                                        src={imgLoading ? black : `https://image.tmdb.org/t/p/original${credit.profile_path}`} 
                                        className="w-full h-[207px] rounded-lg mb-2" 
                                        onLoad={() => {
                                            setImgLoading(false)
                                        }}
                                        alt="" 
                                    />
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