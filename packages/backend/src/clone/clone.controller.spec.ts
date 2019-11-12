import { Test, TestingModule } from "@nestjs/testing";
import { CloneController } from "./clone.controller";
import { CloneService } from "./clone.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CloneEntity } from "./clone.entity";
import { GroupUserService } from "../groupUser/groupUser.service";
import { GroupUserEntity } from "../groupUser/groupUser.entity";

describe("CloneController", () => {
  let controller: CloneController;
  let service: CloneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([CloneEntity, GroupUserEntity])],
      controllers: [CloneController],
      providers: [CloneService, GroupUserService],
    }).compile();

    controller = module.get<CloneController>(CloneController);
    service = module.get<CloneService>(CloneService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
