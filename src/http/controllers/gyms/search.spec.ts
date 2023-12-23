import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Search Gyms (e2e)", () => {
  const baseUrl: string = "/gyms";

  test("should be able to search gyms by title", async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "JavaScript gym",
        phone: "11555555555",
        description: "Description test",
        latitude: -20.7574691,
        longitude: -43.8742615,
      });

    await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "TypeScript Gym",
        phone: "11555555555",
        description: "Description test",
        latitude: -20.7544691,
        longitude: -43.8242615,
      });

    const response = await request(app)
      .get("/gyms/search")
      .query({
        query: "JavaScript",
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
