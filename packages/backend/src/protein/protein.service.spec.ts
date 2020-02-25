import { Test, TestingModule } from "@nestjs/testing";
import { ProteinService } from "./protein.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProteinEntity } from "./protein.entity";
import { MemberModule } from "../member/member.module";
import { CloneModule } from "../clone/clone.module";

describe(ProteinService.name, () => {
  let service: ProteinService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ProteinEntity]), MemberModule, CloneModule],
      providers: [ProteinService],
    }).compile();

    service = module.get<ProteinService>(ProteinService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
