import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("Create Check-in (e2e)", () => {
  test("should be able to create check-in", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const gym = await prisma.gym.create({
      data: {
        title: "Create Gym Test",
        phone: "11555555555",
        description: "Description test",
        latitude: -20.7574691,
        longitude: -43.8742615,
      },
    });

    const response = await request(app)
      .post(`/check-ins/gyms/${gym.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -20.7574691,
        longitude: -43.8742615,
      });

    expect(response.status).toBe(201);
  });
});
