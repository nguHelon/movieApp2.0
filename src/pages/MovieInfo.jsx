import { useParams } from "react-router-dom"
import { BsFillPlayFill, BsBookmarkFill } from "react-icons/bs"
import { FaTimes } from "react-icons/fa"
import { HiHeart } from "react-icons/hi"
import { useGetContentRatingQuery, useGetMovieDetailQuery, useGetMovieTrailerQuery } from "../store/services/tmdbAPI"
import Loader from "../components/Loader"
import MovieCast from "../components/MovieCast"
import MovieRecommendation from "../components/MovieRecommendation"
import MoreMovieInfo from "../components/MoreMovieInfo"
import { useState } from "react"

const MovieTrailer = ({ setShowTrailer }) => {
    const { movieId } = useParams();
    const { data } = useGetMovieTrailerQuery({ movieId });
    const trailerKey = data?.results?.find(trailer => trailer.site == "YouTube" && trailer.type == "Trailer").key;
    
    return (
        <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-gradient-to-r from-black/90 to-black/90 backdrop-blur-xl">
            <div className="w-full flex flex-col justify-center items-center ">
                <FaTimes 
                    className="p-1 text-black font-bold rounded-full text-3xl bg-white mb-3 cursor-pointer" 
                    onClick={() => {
                        setShowTrailer(false);
                    }}
                />                
                <iframe src={`https://www.youtube.com/embed/${trailerKey}`} className="w-[300px] h-[200px] sm:w-[400px] sm:h-[300px] md:w-[700px] md:h-[500px]" ></iframe>
                
            </div>
        </div>
    )
}

const GetMovieRating = () => {
    const { movieId } = useParams();
    const { data } = useGetContentRatingQuery({ movieId });

    return (
        <span className="px-1 rounded-[4px] border border-lightGray2 text-lightGray2">
            {
                data?.results?.find(item => item?.iso_3166_1 == "US")?.release_dates[0]?.certification
            }
        </span>
    )
}

const MovieInfo = () => {
  const [ showTrailer, setShowTrailer ] = useState(false)

  const { movieId } = useParams();
  const { data, isFetching } = useGetMovieDetailQuery({ movieId })

  if (isFetching) return <Loader title="loading movie details..." />

  return (
    <div className="w-full pb-5 absolute top-0 left-0">
        <div className={`bg-[url("https://image.tmdb.org/t/p/original${data?.backdrop_path}")] bg-cover bg-center w-full`}>
            <div className="bg-gradient-to-r from-black/60 to-black/60 z-10 w-full flex flex-col items-center space-y-4 py-10 px-3 md:space-x-4 md:space-y-0 md:px-8 md:flex-row ">
                <div className="max-w-[200px] md:max-w-[300px] h-auto">
                    <img src={`https://image.tmdb.org/t/p/original${data?.poster_path}`} alt={``} className="w-full h-auto rounded-lg" />
                </div>
                <div className="flex-1 text-center md:text-left">
                    <div className="mb-5">
                        <h1 className="text-3xl font-semibold text-white">{data?.original_title} <span className="text-lightGray2">(2023)</span></h1>
                        <div className="flex flex-wrap items-center justify-center md:justify-start space-x-2 text-white">
                            <GetMovieRating />
                            <span>{data?.release_date}</span>
                            <span>({data?.production_countries[0]?.iso_3166_1})</span>
                            <div className="h-[4px] w-[4px] rounded-full bg-white"></div>
                            <p>{data?.genres.map((genre, i) => data?.genres.length == i ? genre.name : genre.name + "," )}</p>
                            <div className="h-[4px] w-[4px] rounded-full bg-white"></div>
                            <span>{data?.runtime} min</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                        <button 
                            className="flex items-center bg-mainorange px-3 py-1 rounded-lg text-white"
                            onClick={() => {
                                setShowTrailer(true);
                            }}
                        >
                            <BsFillPlayFill /> play trailer
                        </button>
                        <button className="p-3 rounded-full text-white bg-primaryGray"><HiHeart /></button>
                        <button className="p-3 rounded-full text-white bg-primaryGray"><BsBookmarkFill /></button>
                    </div>
                    <p className="text-lightGray2 mb-3 italic">{data?.tagline}</p>
                    <div className="">
                        <h1 className="font-bold text-xl text-white mb-2">Overview</h1>
                        <p className="text-white text-sm md:text-[16px]">{data?.overview}</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="w-full px-2">
            <div className="flex items-start flex-col-reverse h-auto sm:flex-row">
                <div className="w-full sm:w-3/4 flex-1">
                    <div className="">
                        <h1 className="text-white text-3xl">Cast</h1>
                        <MovieCast />
                    </div>
                    <div className="mt-10">
                        <h1 className="text-white text-3xl mb-2">Recommendations</h1>
                        <MovieRecommendation />
                    </div>
                </div>
                <div className="w-full sm:w-3/12 flex-1 h-full px-3 grow">
                    <MoreMovieInfo movieData={data} />
                </div>
            </div>
        </div>

        { showTrailer && <MovieTrailer setShowTrailer={setShowTrailer} /> }
    </div>
  )
}

export default MovieInfo