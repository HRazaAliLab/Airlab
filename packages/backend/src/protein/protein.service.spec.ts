import { Test, TestingModule } from "@nestjs/testing";
import { ProteinService } from "./protein.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProteinEntity } from "./protein.entity";
import { GroupUserService } from "../groupUser/groupUser.service";
import { GroupUserEntity } from "../groupUser/groupUser.entity";

describe("ProteinService", () => {
  let service: ProteinService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ProteinEntity, GroupUserEntity])],
      providers: [ProteinService, GroupUserService],
    }).compile();

    service = module.get<ProteinService>(ProteinService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
