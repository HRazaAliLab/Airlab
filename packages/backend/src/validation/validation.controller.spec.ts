import { Test, TestingModule } from "@nestjs/testing";
import { ValidationController } from "./validation.controller";
import { ValidationService } from "./validation.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ValidationEntity } from "./validation.entity";
import { MemberModule } from "../member/member.module";
import { ValidationFileModule } from "../validationFile/validationFile.module";

describe(ValidationController.name, () => {
  let controller: ValidationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([ValidationEntity]),
        MemberModule,
        ValidationFileModule,
      ],
      providers: [ValidationService],
      controllers: [ValidationController],
    }).compile();

    controller = module.get<ValidationController>(ValidationController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
