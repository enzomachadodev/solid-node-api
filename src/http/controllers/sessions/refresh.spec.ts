import { app } from "@/app";
import request from "supertest";

describe("Refresh (e2e)", () => {
  const baseUrl: string = "/sessions";

  test("should be able to refresh token", async () => {
    await request(app).post("/users").send({
      name: "New User",
      email: "newuser@email.com",
      password: "12345",
    });

    const authResponse = await request(app).post(baseUrl).send({
      email: "newuser@email.com",
      password: "12345",
    });

    const cookie = authResponse.get("Set-Cookie");

    const response = await request(app)
      .patch("/sessions/refresh")
      .set("Cookie", cookie)
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
    expect(response.get("Set-Cookie")).toEqual([
      expect.stringContaining("refreshToken="),
    ]);
  });
});
