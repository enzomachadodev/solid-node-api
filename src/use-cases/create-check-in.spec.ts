import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CreateCheckInUseCase } from "./create-check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { ResourseNotFoundError } from "./errors/resource-not-found-error";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CreateCheckInUseCase;

describe("Create Check-In Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateCheckInUseCase(checkInsRepository, gymsRepository);

    gymsRepository.items.push({
      id: "gym-id-1",
      title: "Gym Test",
      phone: "",
      description: "",
      latitude: new Decimal(-20.7592901),
      longitude: new Decimal(-42.8886332),
    });

    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("should be able to create check-in", async () => {
    const { checkIn } = await sut.execute({
      userId: "user-id-1",
      gymId: "gym-id-1",
      userLatitude: -20.7592901,
      userLongitude: -42.8886332,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  test("should not be able to create check-in with invalid gym id", async () => {
    await expect(
      sut.execute({
        userId: "user-id-1",
        gymId: "invalid-gym-id",
        userLatitude: -20.7592901,
        userLongitude: -42.8886332,
      }),
    ).rejects.toBeInstanceOf(ResourseNotFoundError);
  });

  test("should not be able to create check-in twice in the same day", async () => {
    jest.setSystemTime(new Date(2023, 0, 1, 8, 0, 0));

    await sut.execute({
      userId: "user-id-1",
      gymId: "gym-id-1",
      userLatitude: -20.7592901,
      userLongitude: -42.8886332,
    });

    await expect(
      sut.execute({
        userId: "user-id-1",
        gymId: "gym-id-1",
        userLatitude: -20.7592901,
        userLongitude: -42.8886332,
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  test("should be able to create check-in twice in different days", async () => {
    jest.setSystemTime(new Date(2023, 0, 1, 8, 0, 0));

    await sut.execute({
      userId: "user-id-1",
      gymId: "gym-id-1",
      userLatitude: -20.7592901,
      userLongitude: -42.8886332,
    });

    jest.setSystemTime(new Date(2023, 0, 2, 8, 0, 0));

    const { checkIn } = await sut.execute({
      userId: "user-id-1",
      gymId: "gym-id-1",
      userLatitude: -20.7592901,
      userLongitude: -42.8886332,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  test("should not be able to create check-in on distant gym", async () => {
    gymsRepository.items.push({
      id: "gym-id-2",
      title: "Gym Test 2",
      phone: "",
      description: "",
      latitude: new Decimal(-20.7574691),
      longitude: new Decimal(-42.8742615),
    });

    await expect(
      sut.execute({
        userId: "user-id-1",
        gymId: "gym-id-2",
        userLatitude: -20.7574691,
        userLongitude: -43.8742615,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
