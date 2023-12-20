import { Request, Response } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";
import { env } from "@/env";

export async function authenticate(req: Request, res: Response) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const payload = authenticateBodySchema.parse(req.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    const { user } = await authenticateUseCase.execute(payload);

    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.status(201).send({ token });
  } catch (err) {
    if (err instanceof InvalidCredentialsError)
      return res.status(400).send({ message: err.message });
  }
}
