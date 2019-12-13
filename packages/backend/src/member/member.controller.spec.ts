import { Test, TestingModule } from "@nestjs/testing";
import { MemberController } from "./member.controller";
import { MemberService } from "./member.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MemberEntity } from "./member.entity";

describe(MemberController.name, () => {
  let controller: MemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([MemberEntity])],
      providers: [MemberService],
      controllers: [MemberController],
    }).compile();

    controller = module.get<MemberController>(MemberController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
