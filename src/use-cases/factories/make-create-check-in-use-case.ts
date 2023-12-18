import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CreateCheckInUseCase } from "../create-check-in";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeCreateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const gymsRepository = new PrismaGymsRepository();
  const createCheckInUseCase = new CreateCheckInUseCase(
    checkInsRepository,
    gymsRepository,
  );
  return createCheckInUseCase;
}
