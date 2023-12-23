import { Express } from "express";
import request from "supertest";

export async function createAndAuthenticateUser(app: Express) {
  await request(app).post("/users").send({
    name: "New User",
    email: "newuser@email.com",
    password: "12345",
  });

  const authResponse = await request(app).post("/sessions").send({
    email: "newuser@email.com",
    password: "12345",
  });

  const { token } = authResponse.body;

  return { token };
}
