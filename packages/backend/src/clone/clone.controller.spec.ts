import { Test, TestingModule } from "@nestjs/testing";
import { CloneController } from "./clone.controller";
import { CloneService } from "./clone.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CloneEntity } from "./clone.entity";
import { MemberService } from "../member/member.service";
import { MemberEntity } from "../member/member.entity";
import { LotService } from "../lot/lot.service";
import { LotEntity } from "../lot/lot.entity";
import { ValidationService } from "../validation/validation.service";
import { ValidationEntity } from "../validation/validation.entity";

describe("CloneController", () => {
  let controller: CloneController;
  let service: CloneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([CloneEntity, MemberEntity, LotEntity, ValidationEntity]),
      ],
      controllers: [CloneController],
      providers: [CloneService, MemberService, LotService, ValidationService],
    }).compile();

    controller = module.get<CloneController>(CloneController);
    service = module.get<CloneService>(CloneService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
