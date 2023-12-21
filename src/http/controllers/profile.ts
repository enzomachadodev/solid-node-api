import { ResourseNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeGetUserProfileUseCase } from "@/use-cases/factories/make-get-user-profile-use-case";
import { Request, Response } from "express";

export async function profile(request: Request, response: Response) {
  const userId = response.locals.user.id;

  console.log("Passou aqui teste", userId);
  try {
    const getUserProfileUseCase = makeGetUserProfileUseCase();
    const user = await getUserProfileUseCase.execute({ userId });
    return response.status(201).send(user);
  } catch (err) {
    if (err instanceof ResourseNotFoundError)
      return response.status(401).send({ message: err.message });
  }
}
