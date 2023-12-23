import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Profile (e2e)", () => {
  const baseUrl: string = "/users/me";

  test("should be able to get user profile", async () => {
    const { token } = await createAndAuthenticateUser(app);

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
