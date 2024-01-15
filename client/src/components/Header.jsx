import { logo } from "../assets/index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="w-full flex justify-between items-center px-3 py-2 bg-secondaryGray border-b border-lightGray1">
      <Link to="/">
        <div className="flex justify-start items-center">
          <img src={logo} alt="" className="h-5 w-5 mr-2" />
          <span className="text-sm text-mainorange font-bold md:text-3xl">
            MovieApp
          </span>
        </div>
      </Link>
      <div className="mr-7 sm:mr-0">
        {
          user.currentUser == null ? 
          <div className="flex space-x-2">
            <Link
              to="/sign-up"
              className="px-3 py-1 font-medium text-sm flex items-center justify-between rounded-md bg-mainorange md:text-base"
            >
              Sign Up
            </Link>
            <Link
              to="/log-in"
              className="px-3 py-1 font-medium text-sm text-mainorange flex items-center justify-between rounded-md bg-black md:text-base"
            >
              Log In
            </Link>
          </div> :
          <div className="h-[40px] w-[40px]">
            <Link to="/profile">
              <img src={user.currentUser.avatar} alt="user profile" className="w-full h-full rounded-full"/>
            </Link>
          </div>
        }
      </div>
    </div>
  );
};

export default Header;
