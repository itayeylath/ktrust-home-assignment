import { startServer } from "./server/index-server";
import { connectDb } from "./db/index-db";
import express from "express";

const MONGO_URL = "mongodb://localhost/users-test";
const port = 3000;
export const app = express();

startServer(port, app);
connectDb(MONGO_URL);

export default app;
