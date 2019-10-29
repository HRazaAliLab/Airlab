import { Test, TestingModule } from "@nestjs/testing";
import { EnsayoService } from "./ensayo.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnsayoEntity } from "./ensayo.entity";

describe("EnsayoService", () => {
  let service: EnsayoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([EnsayoEntity])],
      providers: [EnsayoService],
    }).compile();

    service = module.get<EnsayoService>(EnsayoService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
