import { Request, Response } from "express";
import { makeGetUserMetricsUseCase } from "@/use-cases/factories/make-get-user-metrics-use-case";

export async function metrics(req: Request, res: Response) {
  const getUserMetricsUseCase = makeGetUserMetricsUseCase();

  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId: res.locals.user.id,
  });

  return res.status(200).send({ checkInsCount });
}
