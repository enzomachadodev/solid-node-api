import { Request, Response } from "express";
import { z } from "zod";
import { registerUseCase } from "@/use-cases/register";

export const register = async (req: Request, res: Response) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

  const payload = registerBodySchema.parse(req.body);

  try {
    await registerUseCase(payload);
  } catch (err) {
    return res.status(409).send();
  }

  return res.status(201).send();
};
