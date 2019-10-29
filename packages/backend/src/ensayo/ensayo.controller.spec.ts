import { Test, TestingModule } from "@nestjs/testing";
import { EnsayoController } from "./ensayo.controller";
import { EnsayoService } from "./ensayo.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnsayoEntity } from "./ensayo.entity";

describe("EnsayoController", () => {
  let controller: EnsayoController;
  let service: EnsayoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([EnsayoEntity])],
      controllers: [EnsayoController],
      providers: [EnsayoService],
    }).compile();

    controller = module.get<EnsayoController>(EnsayoController);
    service = module.get<EnsayoService>(EnsayoService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
