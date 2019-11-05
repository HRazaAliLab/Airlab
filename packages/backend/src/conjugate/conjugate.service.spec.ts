import { Test, TestingModule } from "@nestjs/testing";
import { ConjugateService } from "./conjugate.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConjugateEntity } from "./conjugate.entity";

describe("ConjugateService", () => {
  let service: ConjugateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ConjugateEntity])],
      providers: [ConjugateService],
    }).compile();

    service = module.get<ConjugateService>(ConjugateService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
