import { Request, Response } from "express";
import { z } from "zod";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";

export async function register(req: Request, res: Response) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

  const payload = registerBodySchema.parse(req.body);

  try {
    const registerUseCase = makeRegisterUseCase();
    await registerUseCase.execute(payload);
  } catch (err) {
    if (err instanceof UserAlreadyExistsError)
      return res.status(409).send({ message: err.message });
    return res.status(500).send();
  }

  return res.status(201).send();
}
