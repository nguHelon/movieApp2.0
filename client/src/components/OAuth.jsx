import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUpSuccess } from "../store/services/userSlice";
import { useState } from "react";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ loading, setLoading ] = useState(false);

  const backendURL = import.meta.env.VITE_BACKEND_SERVICE_URL || "http://localhost:5000";

  const handleSubmit = async () => {
    try {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);

        const result = await signInWithPopup(auth, provider);

        const response = await fetch(`${backendURL}/api/auth/google`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(result.user)
        })

        const data = await response.json();
        dispatch(signUpSuccess(data));
        navigate("/");
    } catch(err) {
        console.log(err);
    }
  } 

  return (
    <button
        onClick={handleSubmit}
        type="button"
        className={`text-center py-2 bg-red-700 text-white rounded-lg font-medium fs-3 cursor-pointer`}
        disabled={loading}
    >
        continue with google
    </button>
  )
}

export default OAuth;