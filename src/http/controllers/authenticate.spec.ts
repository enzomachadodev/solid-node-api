import { app } from "@/app";
import request from "supertest";

describe("Authenticate (e2e)", () => {
  const baseUrl: string = "/api/sessions";

  test("should be able to authenticate", async () => {
    await request(app).post("/api/users").send({
      name: "New User",
      email: "newuser@email.com",
      password: "12345",
    });

    const response = await request(app).post(baseUrl).send({
      email: "newuser@email.com",
      password: "12345",
    });

    expect(response.status).toBe(201);
  });
});
