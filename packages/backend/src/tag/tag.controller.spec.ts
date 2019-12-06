import { Test, TestingModule } from "@nestjs/testing";
import { TagController } from "./tag.controller";
import { TagService } from "./tag.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TagEntity } from "./tag.entity";
import { MemberEntity } from "../member/member.entity";
import { MemberService } from "../member/member.service";

describe("TagController", () => {
  let controller: TagController;
  let service: TagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([TagEntity, MemberEntity])],
      controllers: [TagController],
      providers: [TagService, MemberService],
    }).compile();

    controller = module.get<TagController>(TagController);
    service = module.get<TagService>(TagService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
