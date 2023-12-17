import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCase } from "./search-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Search Gyms Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });
  test("should be able to search for gyms", async () => {
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

    const { gyms } = await sut.execute({ query: "JavaScript" });
    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({
        title: "JavaScript Gym",
      }),
    ]);
  });

  test("should be able to fetch paginated gyms search", async () => {
    for (let i = 0; i <= 22; i++) {
      await gymsRepository.create({
        title: `Gym Test ${i + 1}`,
        phone: null,
        description: null,
        latitude: -20.7574691,
        longitude: -43.8742615,
      });
    }

    const page = 2;
    const limit = 20;

    const { gyms } = await sut.execute({ query: "Gym Test", page, limit });

    console.log(gyms);
    expect(gyms).toHaveLength(3);
    expect(gyms).toEqual([
      expect.objectContaining({
        title: "Gym Test 21",
      }),
      expect.objectContaining({
        title: "Gym Test 22",
      }),
      expect.objectContaining({
        title: "Gym Test 23",
      }),
    ]);
  });
});
