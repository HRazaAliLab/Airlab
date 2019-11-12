import { Test, TestingModule } from "@nestjs/testing";
import { CloneService } from "./clone.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CloneEntity } from "./clone.entity";
import { GroupUserService } from "../groupUser/groupUser.service";
import { GroupUserEntity } from "../groupUser/groupUser.entity";

describe("CloneService", () => {
  let service: CloneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([CloneEntity, GroupUserEntity])],
      providers: [CloneService, GroupUserService],
    }).compile();

    service = module.get<CloneService>(CloneService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
