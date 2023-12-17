import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { GetUserProfileUseCase } from "./get-user-profile";
import { ResourseNotFoundError } from "./errors/resource-not-found-error";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });
  test("should be able to get user profile", async () => {
    const newUser = await usersRepository.create({
      name: "John Doe",
      email: "john@email.com",
      password_hash: await hash("12345", 6),
    });

    const { user } = await sut.execute({ userId: newUser.id });
    expect(user.name).toEqual("John Doe");
  });

  test("should not be able to get user profile with invalid id", async () => {
    await expect(
      sut.execute({
        userId: "invalid_user_id",
      }),
    ).rejects.toBeInstanceOf(ResourseNotFoundError);
  });
});
