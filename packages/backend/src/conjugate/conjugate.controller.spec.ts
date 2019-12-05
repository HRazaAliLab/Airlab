import { Test, TestingModule } from "@nestjs/testing";
import { ConjugateController } from "./conjugate.controller";
import { ConjugateService } from "./conjugate.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConjugateEntity } from "./conjugate.entity";
import { GroupUserService } from "../groupUser/groupUser.service";
import { GroupUserEntity } from "../groupUser/groupUser.entity";

describe("ConjugateController", () => {
  let controller: ConjugateController;
  let service: ConjugateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ConjugateEntity, GroupUserEntity])],
      controllers: [ConjugateController],
      providers: [ConjugateService, GroupUserService],
    }).compile();

    controller = module.get<ConjugateController>(ConjugateController);
    service = module.get<ConjugateService>(ConjugateService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
