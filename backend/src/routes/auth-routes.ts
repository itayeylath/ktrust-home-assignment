import express from "express";
import {
    logIn,
    register,
    isAdminByToken,
} from "../controllers/auth-controllers";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", logIn);
authRouter.get("/admin/", isAdminByToken);

export default authRouter;
