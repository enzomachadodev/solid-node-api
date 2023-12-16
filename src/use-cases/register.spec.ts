import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

describe("Register Use Case", () => {
  test("should be able to register user ", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "john@email.com",
      password: "12345",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  test("should hash user password upon registration", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "john@email.com",
      password: "12345",
    });
    const isPasswordCorrectyHashed = await compare("12345", user.password_hash);

    expect(isPasswordCorrectyHashed).toBe(true);
  });

  test("should not be able to register user with the same email twice", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);
    const email = "john@email.com";

    await registerUseCase.execute({
      name: "John Doe",
      email,
      password: "12345",
    });

    await expect(
      registerUseCase.execute({
        name: "John Doe",
        email,
        password: "12345",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
