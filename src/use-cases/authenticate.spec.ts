import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });
  test("should be able to authenticate ", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "john@email.com",
      password_hash: await hash("12345", 6),
    });

    const { user } = await sut.execute({
      email: "john@email.com",
      password: "12345",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  test("should not be able to authenticate with wrong email", async () => {
    await expect(
      sut.execute({
        email: "john@email.com",
        password: "12345",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  test("should not be able to authenticate with wrong password", async () => {
    await expect(
      sut.execute({
        email: "john@email.com",
        password: "111111",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
