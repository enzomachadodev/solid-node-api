import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CreateCheckInUseCase } from "./create-check-in";
import { randomUUID } from "crypto";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CreateCheckInUseCase;

describe("Create Check-In Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CreateCheckInUseCase(checkInsRepository);
  });
  test("should be able to create check-in", async () => {
    const { checkIn } = await sut.execute({
      userId: randomUUID(),
      gymId: randomUUID(),
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
