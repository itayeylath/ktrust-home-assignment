import express from "express";
import { getUserBySessionToken } from "../models/users-models";
import { get, merge } from "lodash";
import { JWTverify } from "../helpers/users-helpers";
require("dotenv").config();

// User authentication by Token.
export const isAuthenticated = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {

        const token = req.headers.authorization;
        // Error if Token NOT exist.
        if (!token) {
            return res.sendStatus(403);
        }

        const isVerify = JWTverify(token);
        // Error if the Token NOT verify.
        if (!isVerify) {
            return res.sendStatus(403);
        }

        const user = await getUserBySessionToken(token);
        // Error if user NOT exist.
         if (!user) {
             return res.sendStatus(403);
        }
        merge(req, { identity: user });
        return next();
    } catch (err) {
        return res.sendStatus(400).json({ massage: err.massage });
    }
};

// Admin User authentication by Mail.
export const isAdmin = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const token = req.headers.authorization;
        // Error if Token NOT exist.
        if (!token) {
            return res.sendStatus(403);
        }
        const user = await getUserBySessionToken(token);
        // Error if user not exsit.
        if (!user) {
            return res.sendStatus(403);
        }
        // Error if it is NOT the admin.
        if (user.email.toString() != process.env.ADMIN_EMAIL) {
            return res.sendStatus(403);
        }
        next();
    } catch (err) {
        return res.sendStatus(400).json({ massage: err.massage });
    }
};
