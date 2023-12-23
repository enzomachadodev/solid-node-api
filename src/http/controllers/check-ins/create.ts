import { Request, Response } from "express";
import { z } from "zod";
import { makeCreateCheckInUseCase } from "@/use-cases/factories/make-create-check-in-use-case";

export async function create(req: Request, res: Response) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  });

  const createCheckInBodySchema = z.object({
    latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
  });

  const { gymId } = createCheckInParamsSchema.parse(req.params);
  const { latitude, longitude } = createCheckInBodySchema.parse(req.body);

  const createCheckInUseCase = makeCreateCheckInUseCase();

  await createCheckInUseCase.execute({
    gymId,
    userId: res.locals.user.id,
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return res.status(201).send();
}
