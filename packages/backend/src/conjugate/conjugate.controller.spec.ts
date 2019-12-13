import { Test, TestingModule } from "@nestjs/testing";
import { ConjugateController } from "./conjugate.controller";
import { ConjugateService } from "./conjugate.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConjugateEntity } from "./conjugate.entity";
import { MemberModule } from "../member/member.module";

describe(ConjugateController.name, () => {
  let controller: ConjugateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ConjugateEntity]), MemberModule],
      providers: [ConjugateService],
      controllers: [ConjugateController],
    }).compile();

    controller = module.get<ConjugateController>(ConjugateController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
