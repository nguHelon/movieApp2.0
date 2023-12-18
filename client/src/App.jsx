import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import ReactionModal from "./components/ReactionModal"
import { Actors, AllActors, AllPopular, AllUpcoming, Home, SearchedActor, SearchedMovie, SearchedMovieIndex, GenreMovies, MovieInfo, ActorInfo, LogIn, SignUp, Profile, PrivateRoutes } from "./pages/pages"
import { useSelector } from "react-redux"

const App = () => {
  const { favoritesModal, watchlistModal, authModal } = useSelector((state) => state.modals);

  return (
    <div className="w-full h-auto flex bg-primaryGray relative">
      <Sidebar />

      {/* modal attachments */}
      {
        favoritesModal.open && <ReactionModal message={favoritesModal.message} />
      }
      {
        watchlistModal.open && <ReactionModal message={favoritesModal.message} />
      }

      <div className="flex-1 flex flex-col">
        <Header />

        <div className="px-5 h-[calc(100vh-57px)] overflow-y-scroll hide-scrollbar relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/log-in" element={<LogIn />} />
            <Route element={<PrivateRoutes />} >
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/popularMovies" element={<AllPopular />} />
            <Route path="/upcomingMovies" element={<AllUpcoming />} />
            <Route path="/actors" element={<Actors />} >
              <Route index element={<AllActors />} />
              <Route path="/actors/:searchTerm" element={<SearchedActor />} />              
            </Route>
            <Route path="/movieSearch" element={<SearchedMovie />} >
              <Route index element={<SearchedMovieIndex />} />
              <Route path="moviebyGenre/:genreId/:genreName" element={<GenreMovies />} />
            </Route>
            <Route path="/movieInfo/:movieId" element={<MovieInfo />} />
            <Route path="/actorInfo/:actorId" element={<ActorInfo />} />
          </Routes>
        </div>
      </div>

    </div>
  )
}

export default App