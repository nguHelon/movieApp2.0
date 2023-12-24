import { useState, useEffect } from "react";
import AuthCheck from "../components/AuthCheck";
import { useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";

const Body = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [userReactions, setUserReactions] = useState({});
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        const getUserReactions = async () => {
            try {
                const response = await fetch(`/api/user/getfavoritesandwatchlist/${currentUser._id}`);

                const userReactions = await response.json();
                setUserReactions(userReactions);
            } catch (err) {
                console.log(err);
            }
        }

        getUserReactions();
    }, [])

    useEffect(() => {
        try{
            setLoading(true);
            userReactions.watchlist?.forEach( async (movieId) => {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTFlZjU2MzE3OWQ2OTM5ZTA3ZWYxOTAxYWVjODIwNCIsInN1YiI6IjYzZDEwMjcxY2I3MWI4MDA4NWRkMWVhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GFORMLkhBq4MYqs5R8HP3kUbrj17SEQtafg5ecl3FAs"
                    }
                })

                const movieDetail = await response.json();
                
                const ifExist = watchlist.find((movie) => movie.id == movieDetail.id);
                
                if (ifExist == undefined) {
                    setWatchlist([...watchlist, movieDetail]);
                }
            });
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }, [userReactions, watchlist]);

    if (loading) return <Loader title="Loading..." />

    if (userReactions?.watchlist?.length == 0) return <p className="text-2xl text-lightGray2 my-5">Your watchlist is empty.</p>

    return (
        <div className="w-full text-center">
            <h1 className="text-2xl text-lightGray2 my-10">Your Watchlist</h1>
            <div className="w-full flex flex-wrap justify-center gap-3">
                {
                    watchlist?.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movieId={movie.id}
                            movieName={movie.original_title}
                            backdropPath={movie.backdrop_path}
                            releaseDate={movie.release_date}
                        />
                    ))
                }
            </div>
        </div>
    )
}

const Watchlist = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    currentUser ? <Body /> : (
        <div>
            <AuthCheck message="Sorry Login to see your Watchlist" />
        </div>
    )
  )
}

export default Watchlist