import mongoose from "mongoose";

const userSchema = mongoose.model({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    likedMovies: {
        type: Array,
    },
    favoriteMovies: {
        type: Array,
    }
});

const User = mongoose.model("User", userSchema);

export default User;