import request from "supertest";
import { app } from "@/app";

describe("Profile (e2e)", () => {
  const baseUrl: string = "/api/me";

  test("should be able to get user profile", async () => {
    await request(app).post("/api/users").send({
      name: "New User",
      email: "newuser@email.com",
      password: "12345",
    });

    const authResponse = await request(app).post("/api/sessions").send({
      email: "newuser@email.com",
      password: "12345",
    });

    const { token } = authResponse.body;

    const response = await request(app)
      .get(baseUrl)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: "New User",
        email: "newuser@email.com",
      }),
    );
  });
});
