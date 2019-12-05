import { Test, TestingModule } from "@nestjs/testing";
import { ProviderController } from "./provider.controller";
import { ProviderService } from "./provider.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProviderEntity } from "./provider.entity";
import { GroupUserService } from "../groupUser/groupUser.service";
import { GroupUserEntity } from "../groupUser/groupUser.entity";

describe("ProviderController", () => {
  let controller: ProviderController;
  let service: ProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ProviderEntity,GroupUserEntity])],
      controllers: [ProviderController],
      providers: [ProviderService, GroupUserService],
    }).compile();

    controller = module.get<ProviderController>(ProviderController);
    service = module.get<ProviderService>(ProviderService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
