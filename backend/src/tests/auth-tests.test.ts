import { describe, expect, test } from "@jest/globals";
import supertest from "supertest";
import request from "supertest";
import app from "../index";

// Must be an exsit user
describe("POST /login", () => {
    test("Given a string for email and Password", async () => {
        const respone = await request(app).post("/auth/login").send({
            email: "admin@gmail.com",
            password: "Abc1234!",
        });
        expect(respone.statusCode).toBe(200);
    });
});
