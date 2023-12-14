import express from "express";
import { deleteUser, updateUser } from "../controllers/user.js";
import verifyToken from "../utils/veriyToken.js";

const router = express.Router();

router.post("/update/:id", verifyToken, updateUser);
router.get("/delete/:id", verifyToken, deleteUser);

export default router;