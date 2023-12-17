import { Request, Response } from "express";
import { z } from "zod";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";

export const authenticate = async (req: Request, res: Response) => {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  console.log(req.body);

  const payload = authenticateBodySchema.parse(req.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository);
    await authenticateUseCase.execute(payload);
  } catch (err) {
    if (err instanceof InvalidCredentialsError)
      return res.status(400).send({ message: err.message });
    return res.status(500).send();
  }

  return res.status(201).send();
};
