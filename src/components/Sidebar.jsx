import { NavLink } from "react-router-dom"

import { HiStar, HiHeart } from "react-icons/hi"
import { BiMoviePlay, BiSolidCameraMovie, BiSolidHome, BiListUl } from "react-icons/bi"
import { TiGroup } from "react-icons/ti"
import { SiThemoviedatabase } from "react-icons/si"

const links = [
  { name: "Home", to: "/", icon: BiSolidHome },
  { name: "Popular movies", to: "/popularMovies", icon: HiStar },
  { name: "Upcoming movies", to: "/upcomingMovies", icon: BiSolidCameraMovie },
  { name: "Now playing", to: "/nowPlaying", icon: BiMoviePlay },
  { name: "Actors", to: "/actors", icon: TiGroup },
  { name: "watchlist", to: "/watchlist", icon: BiListUl },
  { name: "favorites", to: "/favorites", icon: HiHeart }
]

const NavLinks = () => {
  return (
    <div>
      {
        links.map((link) => {
          return (
            <NavLink
              key={link.name}
              to={link.to}
              className={({isActive}) => `flex items-center justify-start text-sm font-medium my-8 text-gray-400 hover:text-mainorange ${ isActive ? "text-mainorange" : ""}`}
            >
              <link.icon className="h-5 w-5 mr-2"  />
              {link.name}
            </NavLink>
          )
        })
      }
    </div>
  )
}

const Sidebar = () => {
  

  return (
    <>
      <div className="flex flex-col items-start justify-between h-[100vh] w-[240px] px-4 py-5 bg-secondaryGray">
        <NavLinks />
        <div className="w-full flex flex-col justify-center items-center text-gray-400 font-bold">
          <span>Powered by</span>
          <SiThemoviedatabase className="ml-2 text-mainorange text-5xl"/>
        </div>
      </div>
    </>
  )
}

export default Sidebar;