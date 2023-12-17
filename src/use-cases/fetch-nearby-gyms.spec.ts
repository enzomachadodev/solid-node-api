import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch Nearby Gyms Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });
  test("should be able to fetch only nearby gyms", async () => {
    await gymsRepository.create({
      title: "JavaScript Gym",
      phone: null,
      description: null,
      latitude: -21.7574691,
      longitude: -41.8742615,
    });

    await gymsRepository.create({
      title: "TypeScript Gym",
      phone: null,
      description: null,
      latitude: -20.7574691,
      longitude: -43.8742615,
    });

    const { gyms } = await sut.execute({
      userLatitude: -20.7574691,
      userLongitude: -43.8742615,
    });
    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({
        title: "TypeScript Gym",
      }),
    ]);
  });
});
