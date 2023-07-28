import express from "express";
const MONGO_URL = "mongodb://localhost/users-test";
const port = 3000;
export const app = express();

import { Application } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import comptrssion from "compression";
import cors from "cors";
import authRouter from "./routes/auth-routes";
import usersRouter from "./routes/user-routes";
// server
export const startServer = (port: number, app: Application) => {
    app.use(
        cors({
            credentials: true,
        })
    );

    app.use(comptrssion());
    app.use(cookieParser());
    app.use(bodyParser.json());
    // Login and Register
    app.use("/auth", authRouter);
    // Users delete/update/get data
    app.use("/users", usersRouter);

    app.listen(port, () =>
        console.log("Server started at port http://localhost:", port)
    );
};

export default app;
