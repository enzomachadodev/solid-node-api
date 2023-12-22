import { app } from "@/app";
import request from "supertest";

describe("Register (e2e)", () => {
  const baseUrl: string = "/users";

  test("should be able to register", async () => {
    const response = await request(app).post(baseUrl).send({
      name: "New User",
      email: "newuser@email.com",
      password: "12345",
    });

    expect(response.status).toBe(201);
  });
});
