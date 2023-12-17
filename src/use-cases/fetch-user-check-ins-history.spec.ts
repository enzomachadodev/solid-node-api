import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { FetchUserCheckInHistoryUseCase } from "./fetch-user-check-ins-history";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: FetchUserCheckInHistoryUseCase;

describe("Fetch User Check Ins Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInHistoryUseCase(checkInsRepository);
  });
  test("should be able to fetch user check-in history", async () => {
    await checkInsRepository.create({
      gym_id: "gym_01",
      user_id: "user_01",
    });

    await checkInsRepository.create({
      gym_id: "gym_02",
      user_id: "user_01",
    });

    const { checkIns } = await sut.execute({ userId: "user_01" });
    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: "gym_01",
      }),
      expect.objectContaining({
        gym_id: "gym_02",
      }),
    ]);
  });

  test("should be able to fetch user paginated check-in history", async () => {
    for (let i = 0; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym_${i + 1}`,
        user_id: "user_01",
      });
    }

    const page = 2;
    const limit = 20;

    const { checkIns } = await sut.execute({ userId: "user_01", page, limit });

    console.log(checkIns);
    expect(checkIns).toHaveLength(3);
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: "gym_21",
      }),
      expect.objectContaining({
        gym_id: "gym_22",
      }),
      expect.objectContaining({
        gym_id: "gym_23",
      }),
    ]);
  });
});
