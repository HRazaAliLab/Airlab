import { Test, TestingModule } from "@nestjs/testing";
import { ConjugateController } from "./conjugate.controller";
import { ConjugateService } from "./conjugate.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConjugateEntity } from "./conjugate.entity";
import { MemberService } from "../member/member.service";
import { MemberEntity } from "../member/member.entity";

describe("ConjugateController", () => {
  let controller: ConjugateController;
  let service: ConjugateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ConjugateEntity, MemberEntity])],
      controllers: [ConjugateController],
      providers: [ConjugateService, MemberService],
    }).compile();

    controller = module.get<ConjugateController>(ConjugateController);
    service = module.get<ConjugateService>(ConjugateService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
