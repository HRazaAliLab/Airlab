import { Test, TestingModule } from "@nestjs/testing";
import { ValidationService } from "./validation.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ValidationEntity } from "./validation.entity";
import { MemberModule } from "../member/member.module";
import { ValidationFileModule } from "../validationFile/validationFile.module";

describe(ValidationService.name, () => {
  let service: ValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([ValidationEntity]),
        MemberModule,
        ValidationFileModule,
      ],
      providers: [ValidationService],
    }).compile();

    service = module.get<ValidationService>(ValidationService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
