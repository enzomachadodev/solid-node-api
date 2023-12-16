import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const newUser: User = {
      ...data,
      id: "user-id",
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.items.push(newUser);

    return newUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email);

    if (!user) return null;

    return user;
  }
}
