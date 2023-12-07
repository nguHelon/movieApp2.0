import User from "../models/user.js";
import bcryptjs from "bcryptjs";

const signUp = async (req, res, next) => {
    const { password, ...userData } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);

    try {
        const newUser = new User({ password: hashedPassword, ...userData });
        await newUser.save();

        return res.status(200).json("User created succesfully")
    } catch (err) {
        next(err);
    }
}

export {
    signUp
}