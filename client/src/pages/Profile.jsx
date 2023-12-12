import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateFailed, updateStart, updateSuccess } from "../store/services/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, currentUser } = useSelector((state) => state.user);
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
        dispatch(updateStart())
        const response = await fetch(`/api/user/update/${currentUser._id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(userData)
        })

        const data = response.json();

        if (data.success == false) {
            dispatch(updateFailed(data.message));
            return;
        }

        dispatch(updateSuccess(data));
    } catch (err) {
        dispatch(updateFailed(err));
    }
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
        <form onClick={handleSubmit} className="w-10/12 flex flex-col items-center space-y-2 md:w-2/5">
            <img src={currentUser.avatar} alt="profile picture" className="h-[100px] w-[100px] rounded-full mb-5" />
            <input
                type="text" 
                placeholder="your full name" 
                name="username"
                value={currentUser.username}
                onChange={handleInputChange}
                required
                className="px-2 py-2 w-full bg-secondaryGray text-white outline-none rounded-lg border border-1 border-gray-600"
            />
            <input 
                type="password" 
                placeholder="create password" 
                name="password"
                value={currentUser.password}
                onChange={handleInputChange}
                required
                className="px-2 py-2 w-full bg-secondaryGray text-white outline-none rounded-lg border border-1 border-gray-600"
            />
            <input
                type="email" 
                placeholder="email" 
                name="email"
                value={currentUser.email}
                onChange={handleInputChange}
                required
                className="px-2 py-2 w-full bg-secondaryGray text-white outline-none rounded-lg border border-1 border-gray-600"
            />
            <input
                type="submit"
                value={loading ? "Updating..." : "Update Profile"}
                className={`text-center py-2 w-full bg-mainorange rounded-lg font-medium fs-3 cursor-pointer ${ loading ? "bg-orange-900 cursor-not-allowed" : ""}`}
                disabled={loading}
            />
            {
                error && <p className="text-red-500 fs-2">{error}</p>
            }
        </form>
    </div>
  )
}

export default Profile