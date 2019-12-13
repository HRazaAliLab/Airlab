import { Test, TestingModule } from "@nestjs/testing";
import { ProteinController } from "./protein.controller";
import { ProteinService } from "./protein.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProteinEntity } from "./protein.entity";
import { MemberModule } from "../member/member.module";

describe(ProteinController.name, () => {
  let controller: ProteinController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ProteinEntity]), MemberModule],
      providers: [ProteinService],
      controllers: [ProteinController],
    }).compile();

    controller = module.get<ProteinController>(ProteinController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
