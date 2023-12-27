import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Nearby Gyms (e2e)", () => {
  const baseUrl: string = "/gyms";

  test("should be able to list nearby gyms", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "JavaScript gym",
        phone: "11555555555",
        description: "Description test",
        latitude: -21.7574691,
        longitude: -41.8742615,
      });

    await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "TypeScript Gym",
        phone: "11555555555",
        description: "Description test",
        latitude: -20.7574691,
        longitude: -43.8742615,
      });

    const response = await request(app)
      .get("/gyms/nearby")
      .query({
        latitude: -21.7574691,
        longitude: -41.8742615,
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "JavaScript gym",
      }),
    ]);
  });
});
