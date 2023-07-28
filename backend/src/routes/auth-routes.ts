import express from "express";
import { logOut, logIn, register, isAdminByMail } from "../controllers/auth-controllers";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", logIn);
authRouter.get("/logout", logOut);
authRouter.get("/admin/:email", isAdminByMail);
export default authRouter;
