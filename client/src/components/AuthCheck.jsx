import { Link } from "react-router-dom";
import { auth } from "../assets";

const AuthCheck = ({ message }) => {
  return (
    <div className="flex-1 p-4 rounded-lg bg-primaryGray text-lightGray2 font-medium  text-center">
        <div className="w-full flex justify-center mb-3">
            <img src={auth} alt="auth img" className="h-24 w-24" />
        </div>
        <p>{message}</p>
        <div className="w-100 flex p-4 space-x-3 justify-center items-center">
            <Link
                to="/sign-up"
                className="px-4 py-1 font-medium text-md text-black flex items-center justify-between rounded-l-full rounded-r-full bg-mainorange"
            >
                Sign Up
            </Link>
            <Link
                to="/log-in"
                className="px-4 py-1 font-medium text-md text-mainorange flex items-center justify-between rounded-l-full rounded-r-full bg-black"
            >
                Log In
            </Link>
        </div>
    </div>
  )
}

export default AuthCheck