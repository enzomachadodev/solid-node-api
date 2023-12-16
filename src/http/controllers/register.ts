import { Request, Response } from "express";
import { z } from "zod";
import { RegisterUseCase } from "@/use-cases/register";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";

export const register = async (req: Request, res: Response) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

  console.log(req.body);

  const payload = registerBodySchema.parse(req.body);

  try {
    const prismaUsersRepositor = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(prismaUsersRepositor);
    await registerUseCase.execute(payload);
  } catch (err) {
    return res.status(409).send();
  }

  return res.status(201).send();
};
