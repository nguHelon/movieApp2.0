import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    setUserData((prevData) => {
        return {...prevData, [e.target.name]: e.target.value};
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        setLoading(true);
        const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })

        const data = await response.json();
        
        if (data.success == false) {
            setError(data.message);
            setLoading(false);
            return;
        }
        
        console.log(data.messgae);
        setError(null);
        setLoading(false);
        navigate("/log-in");

    } catch (err) {
        setError(err);
        setLoading(false);
    }
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
        <form className="w-10/12 flex flex-col space-y-2 md:w-2/5" onSubmit={handleSubmit}>
            <input
                type="text" 
                placeholder="your full name" 
                name="username" 
                onChange={handleInputChange}
                required
                className="px-2 py-2 bg-secondaryGray text-white outline-none rounded-lg border border-1 border-gray-600"
            />
            <input 
                type="password" 
                placeholder="create password" 
                name="password"
                onChange={handleInputChange}
                required
                className="px-2 py-2 bg-secondaryGray text-white outline-none rounded-lg border border-1 border-gray-600"
            />
            <input
                type="email" 
                placeholder="email" 
                name="email" 
                onChange={handleInputChange}
                required
                className="px-2 py-2 bg-secondaryGray text-white outline-none rounded-lg border border-1 border-gray-600"
            />
            <input
                type="submit"
                value={loading ? "Loading..." : "Sign Up"}
                className={`text-center py-2 bg-mainorange rounded-lg font-medium fs-3 cursor-pointer ${ loading ? "bg-orange-900 cursor-not-allowed" : ""}`}
                disabled={loading}
            />
            <OAuth />
            {
                error && <p className="text-red-500 fs-2">{error}</p>
            }
        </form>
    </div>
  )
}

export default SignUp