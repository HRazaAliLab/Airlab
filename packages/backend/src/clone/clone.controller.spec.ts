import { Test, TestingModule } from "@nestjs/testing";
import { CloneController } from "./clone.controller";
import { CloneService } from "./clone.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CloneEntity } from "./clone.entity";
import { MemberModule } from "../member/member.module";
import { LotModule } from "../lot/lot.module";
import { ValidationModule } from "../validation/validation.module";
import { ConjugateModule } from "../conjugate/conjugate.module";

describe(CloneController.name, () => {
  let controller: CloneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([CloneEntity]),
        MemberModule,
        LotModule,
        ConjugateModule,
        ValidationModule,
      ],
      providers: [CloneService],
      controllers: [CloneController],
    }).compile();

    controller = module.get<CloneController>(CloneController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
