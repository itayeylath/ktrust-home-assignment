import express from "express";
import { JWTsign, authentication, random } from "../helpers/users-helpers";
import { createUser, getUserByEmail } from "../models/users-models";
require("dotenv").config();
// Register New user
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

// Log in exist user
export const logIn = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

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

        if (user.authentication.password != expectedHash) {
            return res.sendStatus(403);
        }
        const salt = random();
        const token = JWTsign(user.username, salt);

        user.authentication.sessionToken = token;

        await user.save();

        res.cookie("auth-cookie-itay", user.authentication.sessionToken, {
            domain: "localhost",
            path: "/",
        });

        return res.status(200).json(user).end();
    } catch (err) {
        return res.sendStatus(400).json({ massage: err.massage });
    }
};

//Logout
export const logOut = async (_req: express.Request, res: express.Response) => {
    try {
        res.clearCookie("auth-cookie-itay");
        return res.status(200).end();
    } catch (err) {
        return res.sendStatus(400).json({ massage: err.massage });
    }
};

// Admin user authentication
export const isAdminByMail = async (
    req: express.Request,
    res: express.Response,
) => {
    try {
        const { email } = req.params;
        console.log("email: ", email)
        if (!email) {
            return res.sendStatus(403);
        }

        if (email.toString() != process.env.ADMIN_EMAIL) {
            return res.sendStatus(403);
        }

        return res.status(200).end();
    } catch (err) {
        return res.sendStatus(400).json({ massage: err.massage });
    }
};
