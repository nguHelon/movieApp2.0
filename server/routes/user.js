import express from "express";
import { updateUser } from "../controllers/user.js";
import verifyToken from "../utils/veriyToken.js";

const router = express.Router();

router.patch("/update/:id", verifyToken, updateUser);

export default router;