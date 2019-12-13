import { Test, TestingModule } from "@nestjs/testing";
import { SpeciesController } from "./species.controller";
import { SpeciesService } from "./species.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SpeciesEntity } from "./species.entity";
import { MemberModule } from "../member/member.module";

describe(SpeciesController.name, () => {
  let controller: SpeciesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([SpeciesEntity]), MemberModule],
      providers: [SpeciesService],
      controllers: [SpeciesController],
    }).compile();

    controller = module.get<SpeciesController>(SpeciesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
