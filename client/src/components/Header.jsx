import { logo } from "../assets/index";
import { Link } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";

const Header = () => {
  return (
    <div className="w-full flex justify-between items-center px-3 py-2 bg-secondaryGray border-b border-lightGray1">
      <Link to="/">
        <div className="flex justify-start items-center">
          <img src={logo} alt="" className="h-10 w-10 mr-2" />
          <span className="text-xl text-mainorange font-bold md:text-3xl">
            MovieApp
          </span>
        </div>
      </Link>
      <div className="hidden space-x-2 sm:flex">
        <Link
          to="https://github.com/nguHelon/movieApp2.0"
          className="px-3 py-1 font-medium text-md flex items-center justify-between rounded-md bg-mainorange"
        >
          <AiFillGithub className="mr-2" /> Github
        </Link>
      </div>
    </div>
  );
};

export default Header;
