import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { ValidateCheckInUseCase } from "./validate-check-in";
import { ResourseNotFoundError } from "./errors/resource-not-found-error";
import { LateCheckInValidationError } from "./errors/late-check-in-validation-error";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

describe("Validate Check-In Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkInsRepository);

    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("should be able to validate check-in", async () => {
    const newCheckin = await checkInsRepository.create({
      user_id: "user-id-1",
      gym_id: "gym-id-1",
    });

    const { checkIn } = await sut.execute({
      checkInId: newCheckin.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date));
  });

  test("should not be able to validate check-in with invalid check-in id", async () => {
    await expect(
      sut.execute({
        checkInId: "invalid-checkin-id",
      }),
    ).rejects.toBeInstanceOf(ResourseNotFoundError);
  });

  test("should not be able to validate check-in after 20 minutes of its creation", async () => {
    jest.setSystemTime(new Date(2023, 0, 1, 13, 40));

    const newCheckIn = await checkInsRepository.create({
      gym_id: "gym_01",
      user_id: "user_01",
    });

    const twentyOneMinutesInMs = 1000 * 60 * 21;

    jest.advanceTimersByTime(twentyOneMinutesInMs);

    await expect(() =>
      sut.execute({
        checkInId: newCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError);
  });
});
