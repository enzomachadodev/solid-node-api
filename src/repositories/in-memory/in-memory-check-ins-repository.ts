import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "crypto";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = [];
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn: CheckIn = {
      ...data,
      id: randomUUID(),
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    };

    this.items.push(checkIn);

    return checkIn;
  }
}
