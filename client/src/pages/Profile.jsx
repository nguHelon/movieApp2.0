import { useRef, useState } from "react";
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, logOutFailure, logOutStart, logOutSuccessfull, updateFailed, updateStart, updateSuccess } from "../store/services/userSlice";
import { useSelector, useDispatch } from "react-redux";
// import FileBase from "react-file-base64";

const Profile = () => {
  const dispatch = useDispatch();
  const imageRef = useRef(null);
  const [userUpdated, setUserUpdated] = useState(false);
  const { loading, error, currentUser } = useSelector((state) => state.user);
  const [userData, setUserData] = useState({});
  const backendURL = import.meta.env.VITE_BACKEND_SERVICE_URL || "http://localhost:5000";

  const handleInputChange = (e) => {
    setUserData((prevData) => {
        return {...prevData, [e.target.name]: e.target.value};
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        dispatch(updateStart())
        const response = await fetch(`${backendURL}/api/user/update/${currentUser._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })

        const data = await response.json();

        if (data.success == false) {
            dispatch(updateFailed(data.message));
            return;
        }

        dispatch(updateSuccess(data));
        setUserUpdated(true);
    } catch (err) {
        dispatch(updateFailed(err));
    }
  }

  const handleLogOut = async () => {
    try {
        dispatch(logOutStart());
        const response = await fetch(`${backendURL}/auth/logout`);

        const data = await response.json();

        if (data.success == false) {
            dispatch(logOutFailure(data.message));
            return;
        }

        dispatch(logOutSuccessfull());
    } catch (err) {
        dispatch(logOutFailure(err));
    }
  }

  const deleteUser = async () => {
    try {
        dispatch(deleteUserStart());
        const response = await fetch(`${backendURL}/user/delete/${currentUser._id}`);

        const data = await response.json();

        if (data.success == false) {
            dispatch(deleteUserFailure(data.message));
            return;
        }

        dispatch(deleteUserSuccess());
    } catch (err) {
        dispatch(deleteUserFailure(err));
    }
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        }
    })
  }

  const imageConversion = async (e) => {
    const file = e.target.files[0];
    const base64Image = await convertToBase64(file);
    
    setUserData({ ...userData, avatar: base64Image});
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
        <div className="w-10/12 space-y-2 md:w-2/5">
            <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-2">
                <div className="w-full h-auto flex flex-col items-center justify-center">
                    <img src={userData.avatar || currentUser.avatar} alt="profile picture" className="h-[100px] w-[100px] rounded-full mb-5" />
                    <p className="text-lightGray2 text-2xl font-semibold uppercase">{currentUser.username}</p>
                    <button
                        type="button"
                        className=" rounded-s-full rounded-e-full bg-mainorange text-black font-semibold text-sm px-3 py-1"
                        onClick={() => {
                            imageRef.current.click();
                        }}
                    >
                        Change Photo
                    </button>
                </div>
                <input
                    ref={imageRef}
                    onChange={imageConversion}
                    type="file" 
                    name="avatar"
                    accept="image/*"
                    hidden
                />
                <input
                    type="text" 
                    placeholder="your full name" 
                    name="username"                
                    onChange={handleInputChange}
                    className="px-2 py-2 w-full bg-secondaryGray text-white outline-none rounded-lg border border-1 border-gray-600"
                />
                <input 
                    type="password" 
                    placeholder="New password" 
                    name="password"                
                    onChange={handleInputChange}
                    className="px-2 py-2 w-full bg-secondaryGray text-white outline-none rounded-lg border border-1 border-gray-600"
                />
                <input
                    type="email" 
                    placeholder="email"
                    name="email"                
                    onChange={handleInputChange}
                    className="px-2 py-2 w-full bg-secondaryGray text-white outline-none rounded-lg border border-1 border-gray-600"
                />
                {/* <FileBase 
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) => setUserData({ ...userData, avatar: base64})} 
                /> */}
                <input
                    type="submit"
                    value={loading ? "Updating..." : "Update Profile"}
                    className={`text-center py-2 w-full bg-mainorange rounded-lg font-medium fs-3 cursor-pointer ${ loading ? "bg-orange-900 cursor-not-allowed" : ""}`}
                    disabled={loading}
                />
            </form>
            <div className="w-full flex gap-2 flex-wrap">
                <button 
                    type="button"
                    className="flex-1 py-4 px-1 rounded-lg bg-black text-mainorange"
                    onClick={handleLogOut}
                >
                    Log Out
                </button>
                <button 
                    type="button"
                    className="transition duration-300 flex-1 py-4 px-1 rounded-lg bg-transparent text-red-500 border border-1 border-red-500 hover:bg-red-500 hover:text-black   font-medium"
                    onClick={deleteUser}
                >
                    Delete Account
                </button>
            </div>
            {
                userUpdated && <p className="text-lightGray2 italic">updated your information successfully ✅ </p>
            }
            {
                error && <p className="text-red-500 fs-2">{error}</p>
            }
            </div>
    </div>
  )
}

export default Profile