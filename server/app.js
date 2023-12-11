import express from "express";
import dotenv from "dotenv";
import connect from "./db/connect.js";
import userRouter from "./routes/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//routes
app.use("/api/auth", userRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal server error';

    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const start = async () => {
    try {
        await connect(MONGO_URI);
        console.log("Connected to mongodb");
        app.listen(PORT, () => {
            console.log(`server is running on PORT ${PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
};

start();