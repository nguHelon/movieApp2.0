import { useState, useEffect } from "react";
import AuthCheck from "../components/AuthCheck";
import { useSelector } from "react-redux";

const Body = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [userReactions, setUserReactions] = useState({});
    const [favoriteMovies, setFavoriteMovies] = useState([]);

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
            const userFavoriteMovies = userReactions.favoriteMovies.map( async (movieId) => {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTFlZjU2MzE3OWQ2OTM5ZTA3ZWYxOTAxYWVjODIwNCIsInN1YiI6IjYzZDEwMjcxY2I3MWI4MDA4NWRkMWVhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GFORMLkhBq4MYqs5R8HP3kUbrj17SEQtafg5ecl3FAs"
                    }
                })

                const movieDetail = await response.json();
                return movieDetail;
            })

            setFavoriteMovies(userFavoriteMovies);
        } catch (err) {
            console.log(err);
        }
    }, [userReactions]);

    console.log(userReactions);
    console.log(favoriteMovies);

    return (
        <div className="w-full">
            <h1>Your Favorite Movies</h1>
            <div className="w-full"></div>
        </div>
    )
}

const Favorites = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    currentUser ? <Body /> : (
        <div>
            <AuthCheck />
        </div>
    )
  )
}

export default Favorites