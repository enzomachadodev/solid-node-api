import { Request, Response } from "express";
import { z } from "zod";
import { makeFetchUserCheckInHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case";

export async function history(req: Request, res: Response) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).default(20),
  });

  const { limit, page } = checkInHistoryQuerySchema.parse(req.query);

  const fetchUserCheckInHistoryUseCase = makeFetchUserCheckInHistoryUseCase();

  const { checkIns } = await fetchUserCheckInHistoryUseCase.execute({
    userId: res.locals.user.id,
    limit,
    page,
  });

  return res.status(200).send({ checkIns });
}
