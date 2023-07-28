import express from "express";

const usersRouter = express.Router();
usersRouter.get("/all");
usersRouter.delete("/delete/:id");
usersRouter.patch("/update/:id");
export default usersRouter;
