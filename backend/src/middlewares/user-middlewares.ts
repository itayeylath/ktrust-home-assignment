import express from "express";
import { getUserBySessionToken } from "../models/users-models";
import { get, merge } from "lodash";
import { JWTverify } from "../helpers/users-helpers";
import cookieParser from "cookie-parser";
require("dotenv").config();


// User authentication by cookies
export const isAuthenticated = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {

        const token = req.headers.authorization;;
        console.log("authHeader: ", token);
        console.log("token: ", token);
        if (!token) {
            return res.sendStatus(403);
        }

        const isVerifay = JWTverify(token);

        if (!isVerifay) {
            return res.sendStatus(403);
        }

        // const sessionToken = req.cookies["auth-cookie-itay"];
        // console.log("sessionToken: ", req.headers.cookies)
        // if (!sessionToken) {
        //     console.log(sessionToken);
        //     return res.sendStatus(403);
        // }
        // const isVerifay = JWTverify(sessionToken);

        // if (!isVerifay) {
        //     return res.sendStatus(403);
        // }

        //const user = await getUserBySessionToken(sessionToken);
        const user = await getUserBySessionToken(token);

        merge(req, { identity: user });
        return next();
    } catch (err) {
        return res.sendStatus(400).json({ massage: err.massage });
    }
};

// Admin user authentication
export const isAdmin = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const currentUserEmail = get(req, "identity.email") as string;

        if (!currentUserEmail) {
            return res.sendStatus(403);
        }

        if (currentUserEmail.toString() != process.env.ADMIN_EMAIL) {
            return res.sendStatus(403);
        }

        next();
    } catch (err) {
        return res.sendStatus(400).json({ massage: err.massage });
    }
};
