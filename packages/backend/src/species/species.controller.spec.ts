import { Test, TestingModule } from "@nestjs/testing";
import { SpeciesController } from "./species.controller";
import { SpeciesService } from "./species.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SpeciesEntity } from "./species.entity";
import { MemberService } from "../member/member.service";
import { MemberEntity } from "../member/member.entity";

describe("SpeciesController", () => {
  let controller: SpeciesController;
  let service: SpeciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([SpeciesEntity, MemberEntity])],
      controllers: [SpeciesController],
      providers: [SpeciesService, MemberService],
    }).compile();

    controller = module.get<SpeciesController>(SpeciesController);
    service = module.get<SpeciesService>(SpeciesService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
