import { Test, TestingModule } from "@nestjs/testing";
import { MemberController } from "./member.controller";
import { MemberService } from "./member.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MemberEntity } from "./member.entity";

describe("MemberController", () => {
  let controller: MemberController;
  let service: MemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([MemberEntity])],
      controllers: [MemberController],
      providers: [MemberService],
    }).compile();

    controller = module.get<MemberController>(MemberController);
    service = module.get<MemberService>(MemberService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
