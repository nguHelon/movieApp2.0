import User from "../models/user.js";
import errorHandler from "../utils/errorHandler.js";
import bcryptjs from "bcryptjs";

const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const { username, password, email, avatar } = req.body;

    if (req.user.id != id) {
        next(errorHandler(403, "You are not allowed to update another user"));
    }

    try {
        if (password) {
            password = bcryptjs.hashSync(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(id, { username, password, email, avatar }, { new: true });

        const { password: pass, ...rest } = updatedUser._doc;

        res.status(200).json(rest);
    } catch (err) {
        next(err);
    }
}

export {
    updateUser
}