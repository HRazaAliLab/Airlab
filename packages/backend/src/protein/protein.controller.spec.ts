import { Test, TestingModule } from "@nestjs/testing";
import { ProteinController } from "./protein.controller";
import { ProteinService } from "./protein.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProteinEntity } from "./protein.entity";

describe("ProteinController", () => {
  let controller: ProteinController;
  let service: ProteinService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ProteinEntity])],
      controllers: [ProteinController],
      providers: [ProteinService],
    }).compile();

    controller = module.get<ProteinController>(ProteinController);
    service = module.get<ProteinService>(ProteinService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
