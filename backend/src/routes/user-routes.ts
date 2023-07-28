import { deleteUser, getAllusers, updateUser } from "../controllers/users-controllers";
import express from "express";

const usersRouter = express.Router();
usersRouter.get("/all",getAllusers);
usersRouter.delete("/delete/:id",deleteUser);
usersRouter.patch("/update/:id",updateUser);
export default usersRouter;
