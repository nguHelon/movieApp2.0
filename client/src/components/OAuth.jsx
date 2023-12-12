import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { app } from "../firebase";

const OAuth = () => {

  const handleSubmit = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);

        const result = await signInWithPopup(auth, provider);

        console.log(result);
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