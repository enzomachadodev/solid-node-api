import { prisma } from "@/lib/prisma";
import { Roles } from "@prisma/client";
import { hash } from "bcryptjs";
import { Express } from "express";
import request from "supertest";

export async function createAndAuthenticateUser(app: Express, admin = false) {
  if (admin) {
    await prisma.user.create({
      data: {
        name: "New User",
        email: "newuser@email.com",
        password_hash: await hash("12345", 6),
        role: Roles.ADMIN,
      },
    });
  } else {
    await request(app).post("/users").send({
      name: "New User",
      email: "newuser@email.com",
      password: "12345",
    });
  }

  const authResponse = await request(app).post("/sessions").send({
    email: "newuser@email.com",
    password: "12345",
  });

  const { token } = authResponse.body;

  return { token };
}
