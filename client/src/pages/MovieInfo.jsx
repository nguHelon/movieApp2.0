import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BsFillPlayFill } from "react-icons/bs"
import { FaTimes, FaHeart, FaBookmark } from "react-icons/fa"
import { useGetContentRatingQuery, useGetMovieDetailQuery, useGetMovieTrailerQuery } from "../store/services/tmdbAPI"
import Loader from "../components/Loader"
import MovieCast from "../components/MovieCast"
import MovieRecommendation from "../components/MovieRecommendation"
import MoreMovieInfo from "../components/MoreMovieInfo"
import { addedToFavorite, addedToWatchlist, addingToFavorite, addingToWatchlist, auth, favoriteClose, watchListClose } from "../store/services/modalsSlice"
import { useDispatch, useSelector } from "react-redux"
import { black } from "../assets"

const MovieTrailer = ({ setShowTrailer }) => {
    const { movieId } = useParams();
    const { data, isFetching } = useGetMovieTrailerQuery({ movieId });
    const trailerKey = data?.results?.find(trailer => trailer.site == "YouTube" && trailer.type == "Trailer").key;

    if (isFetching) return <Loader title="loading Trailer..." />
    
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
  const dispatch = useDispatch();    
  const { movieId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [ showTrailer, setShowTrailer ] = useState(false);
  const { data, isFetching } = useGetMovieDetailQuery({ movieId });
  const [ userReactions, setUserReactions] = useState({ isMovieLiked: false, isPartOfWatchlist: false});
  const [imgLoading, setImgLoading] = useState(true);

  useEffect(() => {
    const getUserReactions = async () => {
        try {
            const response = await fetch(`/api/user/getfavoritesandwatchlist/${currentUser._id}`);
            const data = await response.json();

            if (data.favoriteMovies.includes(movieId)) {
                setUserReactions({ ...userReactions, isMovieLiked: true});
            } else if (data.watchlist.includes(movieId)) {
                setUserReactions({ ...userReactions, isPartOfWatchlist: true});
            }
        } catch (err) {
            console.log();
        }
    }

    getUserReactions();
  }, [data]);

  const addToFavorites = async () => {
    try {
        if (currentUser == null) {
            dispatch(auth("Please Sign Up or Log In to add trailers to your favorites"));
            return;
        }

        dispatch(addingToFavorite("Loading..."));

        const response = await fetch(`/api/user/addtofavorites/${currentUser._id}/${movieId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        });

        const data = await response.json();

        if (data.isLiked == false) {
            dispatch(addedToFavorite("Removed from favorites successfully ✅"));
            setUserReactions({ ...userReactions, isMovieLiked: false})
            setTimeout(() => {
                dispatch(favoriteClose());
            }, 5000);
            return;
        }

        dispatch(addedToFavorite("Added to favorites successfully ✅"));
        setUserReactions({ ...userReactions, isMovieLiked: true});

        setTimeout(() => {
            dispatch(favoriteClose());
        }, 5000);
    } catch (err) {
        console.log(err);
    }
  }

  const addToWatchlist = async () => {
    try {
        
        if (currentUser == null) {
            dispatch(auth("please Sign Up or Log In to add trailers to your watchlist"));
            return;
        }

        dispatch(addingToWatchlist("Loading..."));

        const response = await fetch(`/api/user/addtowatchlist/${currentUser._id}/${movieId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        });

        const data = await response.json();

        if (data.partOfWatchlist == false) {
            dispatch(addedToWatchlist("Removed from watchlist successfully ✅"));
            setUserReactions({ ...userReactions, isPartOfWatchlist: false});
            setTimeout(() => {
                dispatch(watchListClose());
            }, 5000);
            return;
        }

        dispatch(addedToWatchlist("Added to watchlist successfully ✅"));
        setUserReactions({ ...userReactions, isPartOfWatchlist: true});

        setTimeout(() => {
            dispatch(watchListClose());
        }, 5000);
    } catch (err) {
        console.log(err);
    }
  }

  if (isFetching) return <Loader title="loading movie details..." />

  return (
    <div className="w-full pb-5 absolute top-0 left-0">
        <div className={`bg-[url("https://image.tmdb.org/t/p/original${data?.backdrop_path}")] bg-cover bg-center w-full`}>
            <div className="bg-gradient-to-r from-black/60 to-black/60 z-10 w-full flex flex-col items-center space-y-4 py-10 px-3 md:space-x-4 md:space-y-0 md:px-8 md:flex-row ">
                <div className="max-w-[200px] md:max-w-[300px] h-auto">
                    <img 
                        src={imgLoading ? black : `https://image.tmdb.org/t/p/original${data?.poster_path}`} alt={``} 
                        className={`w-full ${imgLoading ? "h-[450px]" : "h-auto"} rounded-lg`} 
                        onLoad={() => {
                            setImgLoading(false);
                        }}
                    />
                </div>
                <div className="flex-1 text-center md:text-left">
                    <div className="mb-5">
                        <h1 className="text-3xl font-semibold text-white">{data?.original_title} <span className="text-lightGray2">({data?.release_date?.split("-")[0]})</span></h1>
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
                        <button
                            onClick={addToFavorites}
                            className={`p-3 rounded-full bg-secondaryGray ${ userReactions.isMovieLiked ? "text-red-500" : "text-white"}`}
                        >
                            <FaHeart />    
                        </button>
                        <button
                            onClick={addToWatchlist}
                            className={`p-3 rounded-full bg-secondaryGray ${ userReactions.isPartOfWatchlist ? "text-green-700" : "text-white"}`}
                        >
                            <FaBookmark />    
                        </button>              
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