import User from "../models/user.js";
import errorHandler from "../utils/errorHandler.js";
import bcryptjs from "bcryptjs";

const updateUser = async (req, res, next) => {
    const { id } = req.params;
    let { username, password, email } = req.body;

    if (req.user.id != id) {
        next(errorHandler(403, "You are not allowed to update another user"));
    }

    try {
        if (password) {
            password = bcryptjs.hashSync(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(id, { username, password, email }, { new: true });

        const { password: pass, ...rest } = updatedUser._doc;

        res.status(200).json(rest);
    } catch (err) {
        next(err);
    }
}

const deleteUser = async (req, res, next) => {
    if (req.user.id == req.params.id) next(errorHandler(403, "You are not allowed to delete another user"));

    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie("access_token");
        res.status(200).json("user deleted successfully");
    } catch (err) {
        next(err);
    }
}

const addToFavorites = async (req, res, next) => {
    const { id, movieId } = req.params;

    if (req.user.id != id) next(errorHandler(403, "Log In to your own account to like for your own movies!"));

    try {
        const user = await User.findById(id);
        const favoriteMovies = user.favoriteMovies;

        const movie = favoriteMovies.find((movie) => movieId == movie);

        if (movie) {
            res.status(200).json(movie);
            return;
        }

        const response = await User.updateOne({ _id: id }, { $push: { favoriteMovies: { $each: [movieId] } } });

        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
}

export {
    updateUser,
    deleteUser,
    addToFavorites
}