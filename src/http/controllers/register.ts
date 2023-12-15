import { prisma } from "@/lib/prisma";
import { Request, Response } from "express";
import { z } from "zod";

export const register = async (req: Request, res: Response) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

  const { name, email, password } = registerBodySchema.parse(req.body);

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password,
    },
  });

  return res.status(201).send();
};
