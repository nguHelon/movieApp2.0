import { useState } from "react";
import { useSelector } from "react-redux";
import { logInFailure, logInStart, logInSuccess } from "../store/services/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.user);
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: ""
    })

    const handleInputChange = (e) => {
        setUserData((prevData) => {
            return {...prevData, [e.target.name]: e.target.value};
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(logInStart());
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(userData)
            })

            const data = await response.json();

            if (data.success == false) {
                dispatch(logInFailure(data.message));
                return;
            }

            dispatch(logInSuccess(data));
            navigate("/");
        } catch (err) {
            dispatch(logInFailure(err));          
        }
    }

    return (
        <div className="w-full h-full flex justify-center items-center">
            <form className="w-10/12 flex flex-col space-y-2 md:w-2/5" onSubmit={handleSubmit}>               
                <input 
                    type="password" 
                    placeholder="Password" 
                    name="password"
                    required
                    onChange={handleInputChange}
                    className="px-2 py-2 bg-secondaryGray text-white outline-none rounded-lg border border-1 border-gray-600"
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    name="email"
                    required
                    onChange={handleInputChange}
                    className="px-2 py-2 bg-secondaryGray text-white outline-none rounded-lg border border-1 border-gray-600"
                />
                <input
                    type="submit"
                    value="Log In"
                    className={`text-center py-2 bg-mainorange rounded-lg font-medium fs-3 cursor-pointer ${ loading ? "bg-orange-900 cursor-not-allowed" : ""}`}
                    disabled={loading}            
                />
                <p className="text-lightGray2">or</p>
                {
                    error && <p className="text-red-500 fs-2">{error}</p>
                }
            </form>
        </div>
    )
}

export default LogIn