import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Create Gym (e2e)", () => {
  const baseUrl: string = "/gyms";

  test("should be able to create gym", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Create Gym Test",
        phone: "11555555555",
        description: "Description test",
        latitude: -20.7574691,
        longitude: -43.8742615,
      });

    expect(response.status).toBe(201);
  });
});
