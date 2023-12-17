import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface FetchUserCheckInHistoryUseCaseRequest {
  userId: string;
  page?: number;
  limit?: number;
}

interface FetchUserCheckInHistoryUseCaseResponse {
  checkIns: CheckIn[];
  page: number;
  limit: number;
}

export class FetchUserCheckInHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    limit = 20,
    page = 1,
  }: FetchUserCheckInHistoryUseCaseRequest): Promise<FetchUserCheckInHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
      limit,
    );

    return { checkIns, page, limit };
  }
}
