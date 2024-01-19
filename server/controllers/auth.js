import User from "../models/user.js";
import errorHandler from "../utils/errorHandler.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

const cookieOptions = {
    domain: "https://hcmovieapp.netlify.app/"
}

const signUp = async (req, res, next) => {
    const { password, ...userData } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);

    try {
        const user = await User.findOne({ email: userData.email });
        if (user) {
            next(errorHandler(400, "email already exist, please choose another one"));
            return
        }

        const newUser = new User({ password: hashedPassword, ...userData });
        await newUser.save();

        return res.status(200).json("User created succesfully")
    } catch (err) {
        next(err);
    }
}

const logIn = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            next(errorHandler(404, `user with email ${email} does not exist`));
            return;
        }

        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            next(errorHandler(400, "wrong credentials"));
            return;
        }

        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
        const { password: pass, ...userData } = user._doc;

        res
            .cookie("access_token", token, cookieOptions)
            .status(200)
            .json(userData);
    } catch (err) {
        next(err);
    }
}

const googleSignIn = async (req, res, next) => {
    const { displayName: username, email, photoURL: avatar } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
            const { password: pass, ...userData } = user._doc;

            res
                .cookie("access_token", token, cookieOptions)
                .status(200)
                .json(userData);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

            const newUser = new User({ username, email, password: hashedPassword, avatar })
            await newUser.save();

            const token = jwt.sign({ id: newUser._id }, process.env.TOKEN_SECRET);
            const { password: pass, ...userData } = newUser._doc;

            res
                .cookie("access_token", token, cookieOptions)
                .status(200)
                .json(userData);
        }
    } catch (err) {
        next(err);
    }
}

const logOut = async (req, res, next) => {
    try {
        res.clearCookie("access_token");
        res.status(200).json("logged out successfully")
    } catch (err) {
        next(err);
    }
}

export {
    signUp,
    logIn,
    logOut,
    googleSignIn
}