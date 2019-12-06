import { Test, TestingModule } from "@nestjs/testing";
import { ProviderController } from "./provider.controller";
import { ProviderService } from "./provider.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProviderEntity } from "./provider.entity";
import { MemberService } from "../member/member.service";
import { MemberEntity } from "../member/member.entity";

describe("ProviderController", () => {
  let controller: ProviderController;
  let service: ProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ProviderEntity,MemberEntity])],
      controllers: [ProviderController],
      providers: [ProviderService, MemberService],
    }).compile();

    controller = module.get<ProviderController>(ProviderController);
    service = module.get<ProviderService>(ProviderService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
