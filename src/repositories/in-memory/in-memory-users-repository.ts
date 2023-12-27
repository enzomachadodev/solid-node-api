import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { randomUUID } from "crypto";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const newUser: User = {
      ...data,
      id: randomUUID(),
      created_at: new Date(),
      updated_at: new Date(),
      role: data.role || "MEMBER",
    };

    this.items.push(newUser);

    return newUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email);

    if (!user) return null;

    return user;
  }

  async findById(userId: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === userId);

    if (!user) return null;

    return user;
  }
}
