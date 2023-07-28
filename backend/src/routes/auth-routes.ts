import express from "express";
import { logOut, logIn, register } from "../controllers/auth-controllers";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", logIn);
authRouter.get("/logout", logOut);

export default authRouter;
