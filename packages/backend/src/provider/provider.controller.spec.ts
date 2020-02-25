import { Test, TestingModule } from "@nestjs/testing";
import { ProviderController } from "./provider.controller";
import { ProviderService } from "./provider.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProviderEntity } from "./provider.entity";
import { MemberModule } from "../member/member.module";
import { ReagentModule } from "../reagent/reagent.module";

describe(ProviderController.name, () => {
  let controller: ProviderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ProviderEntity]), MemberModule, ReagentModule],
      providers: [ProviderService],
      controllers: [ProviderController],
    }).compile();

    controller = module.get<ProviderController>(ProviderController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
