import { Gym, Prisma } from "@prisma/client";
import { FindManyNearbyParams, GymsRepository } from "../gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { randomUUID } from "crypto";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const newGym: Gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      phone: data.phone || null,
      description: data.description || null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
    };
    this.items.push(newGym);
    return newGym;
  }

  async findById(gymId: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === gymId);
    if (!gym) return null;
    return gym;
  }

  async searchMany(query: string, page: number, limit: number): Promise<Gym[]> {
    const gyms = this.items
      .filter((gym) => gym.title.includes(query))
      .slice((page - 1) * limit, page * limit);
    return gyms;
  }

  async findManyNearby(params: FindManyNearbyParams): Promise<Gym[]> {
    return this.items.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber(),
        },
      );
      return distance < 10;
    });
  }
}
