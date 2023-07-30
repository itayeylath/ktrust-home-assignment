import { isAuthenticated } from "../middlewares/user-middlewares";
import {
    deleteUser,
    getAllusers,
    updateUser,
} from "../controllers/users-controllers";
import express from "express";

const usersRouter = express.Router();
usersRouter.get("/all", isAuthenticated, getAllusers);
usersRouter.delete("/delete/:id", deleteUser);
usersRouter.patch("/update/:id", updateUser);
// TODO: isAdmin as middelware for deleteUser and updateUser.
export default usersRouter;
