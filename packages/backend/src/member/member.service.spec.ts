import { Test, TestingModule } from "@nestjs/testing";
import { MemberService } from "./member.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MemberEntity } from "./member.entity";

describe("MemberService", () => {
  let service: MemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([MemberEntity])],
      providers: [MemberService],
    }).compile();

    service = module.get<MemberService>(MemberService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
