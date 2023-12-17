import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { GetUserMetricsUseCase } from "./get-user-metrics";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

describe("Get User Metrics Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(checkInsRepository);
  });
  test("should be able to get check-ins count from user metrics", async () => {
    await checkInsRepository.create({
      gym_id: "gym_01",
      user_id: "user_01",
    });

    await checkInsRepository.create({
      gym_id: "gym_02",
      user_id: "user_01",
    });

    const { checkInsCount } = await sut.execute({ userId: "user_01" });

    expect(checkInsCount).toEqual(2);
  });
});
