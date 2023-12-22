import { Request, Response } from "express";
import { z } from "zod";
import { makeSearchGymsUseCase } from "@/use-cases/factories/make-serach-gyms-use-case";

export async function searchGyms(req: Request, res: Response) {
  const searchGymsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).default(20),
  });

  const query = searchGymsQuerySchema.parse(req.query);

  const searchGymUseCase = makeSearchGymsUseCase();

  const { gyms } = await searchGymUseCase.execute(query);

  return res.status(200).send(gyms);
}
