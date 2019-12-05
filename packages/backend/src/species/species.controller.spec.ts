import { Test, TestingModule } from "@nestjs/testing";
import { SpeciesController } from "./species.controller";
import { SpeciesService } from "./species.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SpeciesEntity } from "./species.entity";
import { GroupUserService } from "../groupUser/groupUser.service";
import { GroupUserEntity } from "../groupUser/groupUser.entity";

describe("SpeciesController", () => {
  let controller: SpeciesController;
  let service: SpeciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([SpeciesEntity, GroupUserEntity])],
      controllers: [SpeciesController],
      providers: [SpeciesService, GroupUserService],
    }).compile();

    controller = module.get<SpeciesController>(SpeciesController);
    service = module.get<SpeciesService>(SpeciesService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
