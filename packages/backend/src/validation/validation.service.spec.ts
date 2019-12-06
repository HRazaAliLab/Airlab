import { Test, TestingModule } from "@nestjs/testing";
import { ValidationService } from "./validation.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ValidationEntity } from "./validation.entity";
import { MemberService } from "../member/member.service";
import { MemberEntity } from "../member/member.entity";
import { ValidationFileService } from "../validationFile/validationFile.service";
import { ValidationFileEntity } from "../validationFile/validationFile.entity";

describe("ValidationService", () => {
  let service: ValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([ValidationEntity, MemberEntity, ValidationFileEntity]),
      ],
      providers: [ValidationService, MemberService, ValidationFileService],
    }).compile();

    service = module.get<ValidationService>(ValidationService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
