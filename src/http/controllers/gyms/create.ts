import { Request, Response } from "express";
import { z } from "zod";
import { makeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case";

export async function createGym(req: Request, res: Response) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().email(),
    phone: z.string(),
    latitude: z.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.number().refine((value) => Math.abs(value) <= 180),
  });

  const payload = createGymBodySchema.parse(req.body);

  const createGymUseCase = makeCreateGymUseCase();

  await createGymUseCase.execute(payload);

  return res.status(201).send();
}
