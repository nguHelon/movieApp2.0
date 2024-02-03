import { useState, useEffect } from "react";
import AuthCheck from "../components/AuthCheck";
import { useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";

const Body = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [userReactions, setUserReactions] = useState({});
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const backendURL = import.meta.env.VITE_BACKEND_SERVICE_URL || "http://localhost:5000";

    useEffect(() => {
        const getUserReactions = async () => {
            try {
                const response = await fetch(`${backendURL}/api/user/getfavoritesandwatchlist/${currentUser._id}`, {
                    credentials: "include"
                });

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
            userReactions?.favoriteMovies?.forEach( async (movieId) => {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTFlZjU2MzE3OWQ2OTM5ZTA3ZWYxOTAxYWVjODIwNCIsInN1YiI6IjYzZDEwMjcxY2I3MWI4MDA4NWRkMWVhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GFORMLkhBq4MYqs5R8HP3kUbrj17SEQtafg5ecl3FAs"
                    }
                })

                const movieDetail = await response.json();
                
                const ifExist = favoriteMovies.find((movie) => movie.id == movieDetail.id);
                
                if (ifExist == undefined) {
                    setFavoriteMovies([...favoriteMovies, movieDetail]);
                }
            });
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }, [userReactions, favoriteMovies]);

    if (loading) return <Loader title="Loading..." />

    if (userReactions?.favoriteMovies?.length == 0) return <p className="text-2xl text-lightGray2 my-5">Your favorite movies will appear here.</p>

    return (
        <div className="w-full text-center">
            <h1 className="text-2xl text-lightGray2 my-10">Your Favorite Movies</h1>
            <div className="w-full flex flex-wrap justify-center gap-3">
                {
                    favoriteMovies?.map((movie) => (
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

const Favorites = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    currentUser ? <Body /> : (
        <div>
            <AuthCheck message="Sorry Login to see your favorites" />
        </div>
    )
  )
}

export default Favorites