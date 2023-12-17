import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface FetchUserCheckInHistoryUseCaseRequest {
  userId: string;
}

export class FetchUserCheckInHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({ userId }: FetchUserCheckInHistoryUseCaseRequest) {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId);
    return { checkIns };
  }
}
