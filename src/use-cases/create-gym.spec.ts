import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "./create-gym";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });
  test("should be able to register user ", async () => {
    const { gym } = await sut.execute({
      title: "Create Gym Test",
      phone: null,
      description: null,
      latitude: -20.7574691,
      longitude: -43.8742615,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
