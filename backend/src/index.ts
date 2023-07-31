import { startServer } from "./server/index-server";
import { connectDb } from "./db/index-db";
import express from "express";
require("dotenv").config();

export const app = express();

startServer(process.env.PORT, app);
connectDb(process.env.MONGO_URL);

export default app;
