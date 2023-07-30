import express from "express";
import { JWTsign, authentication, random } from "../helpers/users-helpers";
import {
    createUser,
    getUserByEmail,
    getUserBySessionToken,
} from "../models/users-models";
require("dotenv").config();

// Register New user.
export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            return res.sendStatus(400);
        }

        const isExistUser = await getUserByEmail(email);

        if (isExistUser) {
            return res.sendStatus(400);
        }

        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });

        return res.status(200).json(user).end();
    } catch (err) {
        return res.sendStatus(400).json({ massage: err.massage });
    }
};

// Login exist user.
export const logIn = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        // Error if input is empty.
        if (!email || !password || email === "" || password === "") {
            return res.sendStatus(400);
        }

        const user = await getUserByEmail(email).select(
            "+authentication.salt +authentication.password"
        );

        if (!user) {
            return res.sendStatus(400);
        }

        const expectedHash = authentication(user.authentication.salt, password);
        // Valid password.
        if (user.authentication.password != expectedHash) {
            return res.sendStatus(403);
        }
        // Creates a Token.
        const salt = random();
        const token = JWTsign(user.username, salt);
        user.authentication.sessionToken = token;

        await user.save();

        return res.status(200).json(user).end();
    } catch (err) {
        return res.sendStatus(400).json({ massage: err.massage });
    }
};

// Admin user authentication.
export const isAdminByToken = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const token = req.headers.authorization;
        const user = await getUserBySessionToken(token);
        // Error if user not exsit.
        if (!user) {
            return res.sendStatus(403);
        }
        // Error if it is NOT the admin.
        if (user.email.toString() != process.env.ADMIN_EMAIL) {
            return res.sendStatus(403);
        }

        return res.status(200).end();
    } catch (err) {
        return res.sendStatus(400).json({ massage: err.massage });
    }
};
