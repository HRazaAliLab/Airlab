import { Test, TestingModule } from "@nestjs/testing";
import { ReagentService } from "./reagent.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReagentEntity } from "./reagent.entity";
import { GroupUserService } from "../groupUser/groupUser.service";
import { GroupUserEntity } from "../groupUser/groupUser.entity";

describe("ReagentService", () => {
  let service: ReagentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ReagentEntity, GroupUserEntity])],
      providers: [ReagentService, GroupUserService],
    }).compile();

    service = module.get<ReagentService>(ReagentService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
