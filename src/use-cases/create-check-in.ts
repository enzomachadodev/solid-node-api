import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface CreateCheckInUseCaseRequest {
  userId: string;
  gymId: string;
}

interface CreateCheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CreateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: CreateCheckInUseCaseRequest): Promise<CreateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.create({
      gym_id: userId,
      user_id: gymId,
    });

    return { checkIn };
  }
}
