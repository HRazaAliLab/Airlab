import { Test, TestingModule } from "@nestjs/testing";
import { ProteinController } from "./protein.controller";
import { ProteinService } from "./protein.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProteinEntity } from "./protein.entity";
import { GroupUserEntity } from "../groupUser/groupUser.entity";
import { GroupUserService } from "../groupUser/groupUser.service";

describe("ProteinController", () => {
  let controller: ProteinController;
  let service: ProteinService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ProteinEntity, GroupUserEntity])],
      controllers: [ProteinController],
      providers: [ProteinService, GroupUserService],
    }).compile();

    controller = module.get<ProteinController>(ProteinController);
    service = module.get<ProteinService>(ProteinService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
