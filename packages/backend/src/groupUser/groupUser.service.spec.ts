import { Test, TestingModule } from "@nestjs/testing";
import { GroupUserService } from "./groupUser.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GroupUserEntity } from "./groupUser.entity";

describe("GroupUserService", () => {
  let service: GroupUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([GroupUserEntity])],
      providers: [GroupUserService],
    }).compile();

    service = module.get<GroupUserService>(GroupUserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
