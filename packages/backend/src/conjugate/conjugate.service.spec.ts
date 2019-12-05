import { Test, TestingModule } from "@nestjs/testing";
import { ConjugateService } from "./conjugate.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConjugateEntity } from "./conjugate.entity";
import { GroupUserEntity } from "../groupUser/groupUser.entity";
import { GroupUserService } from "../groupUser/groupUser.service";

describe("ConjugateService", () => {
  let service: ConjugateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ConjugateEntity, GroupUserEntity])],
      providers: [ConjugateService, GroupUserService],
    }).compile();

    service = module.get<ConjugateService>(ConjugateService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
