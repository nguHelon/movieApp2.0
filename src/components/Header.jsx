import { logo } from "../assets/index";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full flex justify-between items-center px-3 py-2 bg-secondaryGray border-b border-lightGray1">
      <Link to="/">
        <div className="flex justify-start items-center">
          <img src={logo} alt="" className="h-10 w-10 mr-2" />
          <span className="text-xl text-mainorange font-bold md:text-3xl">MovieApp</span>
        </div>
      </Link>
      <div className="hidden space-x-2 sm:flex">
        <Link className="px-3 py-1 font-medium text-md rounded-md bg-mainorange">favorites</Link>
        <Link className="px-3 py-1 font-medium text-md rounded-md bg-transparent text-lightGray2 border border-lightGray2">watchlist</Link>
      </div>
    </div>
  )
}

export default Header