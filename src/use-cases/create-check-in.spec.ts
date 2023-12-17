import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CreateCheckInUseCase } from "./create-check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";

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
      latitude: new Decimal(0),
      longitude: new Decimal(0),
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
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  test("should not be able to create check-in twice in the same day", async () => {
    jest.setSystemTime(new Date(2023, 0, 1, 8, 0, 0));

    await sut.execute({
      userId: "user-id-1",
      gymId: "gym-id-1",
      userLatitude: 0,
      userLongitude: 0,
    });

    await expect(
      sut.execute({
        userId: "user-id-1",
        gymId: "gym-id-1",
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  test("should be able to create check-in twice in different days", async () => {
    jest.setSystemTime(new Date(2023, 0, 1, 8, 0, 0));

    await sut.execute({
      userId: "user-id-1",
      gymId: "gym-id-1",
      userLatitude: 0,
      userLongitude: 0,
    });

    jest.setSystemTime(new Date(2023, 0, 2, 8, 0, 0));

    const { checkIn } = await sut.execute({
      userId: "user-id-1",
      gymId: "gym-id-1",
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  // test("should not be able to create check-in in more than 100 meters to the gym", async () => {
  //   await expect(
  //     sut.execute({
  //       userId: "user-id-1",
  //       gymId: "gym-id-1",
  //       userLatitude: 0,
  //       userLongitude: 0,
  //     }),
  //   ).rejects.toBeInstanceOf(Error);
  // });
});
