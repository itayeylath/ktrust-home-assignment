import { describe, expect, test } from "@jest/globals";
import supertest from "supertest";
import request from "supertest";
import app from "../index";

// Must be an exsit user!
describe("POST auth/login", () => {
    test("Given a string for email and Password", async () => {
        const respone = await request(app).post("/auth/login").send({
            email: "admin@gmail.com",
            password: "Abc1234!",
        });
        expect(respone.statusCode).toBe(200);
    });
});
// Must be an exsit user that NOT exsit!
describe("POST auth/register", () => {
    test("Given a string for email and Password", async () => {
        const respone = await request(app).post("/auth/register").send({
            email: "testt@gmail.com",
            password: "Abc1234!",
            username: "testUser",
        });
        expect(respone.statusCode).toBe(200);
    });
});
