import { UsersRepository } from "@/repositories/users-repository";
import { ResourseNotFoundError } from "./errors/resource-not-found-error";

interface GetUserProfileUseCaseRequest {
  userId: string;
}

export class GetUserProfileUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({ userId }: GetUserProfileUseCaseRequest) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new ResourseNotFoundError();
    return { ...user, password_hash: undefined };
  }
}
