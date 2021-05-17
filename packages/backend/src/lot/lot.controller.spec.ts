import { Test, TestingModule } from "@nestjs/testing";
import { LotController } from "./lot.controller";
import { LotService } from "./lot.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LotEntity } from "./lot.entity";
import { MemberModule } from "../member/member.module";
import { ConjugateModule } from "../conjugate/conjugate.module";
import { ValidationModule } from "../validation/validation.module";

describe(LotController.name, () => {
  let controller: LotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([LotEntity]),
        MemberModule,
        ConjugateModule,
        ValidationModule,
      ],
      providers: [LotService],
      controllers: [LotController],
    }).compile();

    controller = module.get<LotController>(LotController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
