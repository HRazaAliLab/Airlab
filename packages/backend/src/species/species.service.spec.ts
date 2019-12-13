import { Test, TestingModule } from "@nestjs/testing";
import { SpeciesService } from "./species.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SpeciesEntity } from "./species.entity";
import { MemberModule } from "../member/member.module";

describe(SpeciesService.name, () => {
  let service: SpeciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([SpeciesEntity]), MemberModule],
      providers: [SpeciesService],
    }).compile();

    service = module.get<SpeciesService>(SpeciesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
