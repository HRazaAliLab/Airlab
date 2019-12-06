import { Test, TestingModule } from "@nestjs/testing";
import { ConjugateService } from "./conjugate.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConjugateEntity } from "./conjugate.entity";
import { MemberEntity } from "../member/member.entity";
import { MemberService } from "../member/member.service";

describe("ConjugateService", () => {
  let service: ConjugateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ConjugateEntity, MemberEntity])],
      providers: [ConjugateService, MemberService],
    }).compile();

    service = module.get<ConjugateService>(ConjugateService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
