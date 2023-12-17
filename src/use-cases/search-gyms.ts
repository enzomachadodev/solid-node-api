import { GymsRepository } from "@/repositories/gyms-repository";

interface SearchGymsUseCaseRequest {
  query: string;
  page?: number;
  limit?: number;
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ query, limit = 20, page = 1 }: SearchGymsUseCaseRequest) {
    const gyms = await this.gymsRepository.searchMany(query, page, limit);
    return { gyms };
  }
}
