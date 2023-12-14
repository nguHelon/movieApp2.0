import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUpSuccess } from "../store/services/userSlice";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);

        const result = await signInWithPopup(auth, provider);

        const response = await fetch("/api/auth/google", {
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
    >
        continue with google
    </button>
  )
}

export default OAuth;