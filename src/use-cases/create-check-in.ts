import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { ResourseNotFoundError } from "./errors/resource-not-found-error";

interface CreateCheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CreateCheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CreateCheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
  }: CreateCheckInUseCaseRequest): Promise<CreateCheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId);
    if (!gym) throw new ResourseNotFoundError();
    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    );
    if (checkInOnSameDate) throw new Error();
    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return { checkIn };
  }
}
