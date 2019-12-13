import { Test, TestingModule } from "@nestjs/testing";
import { TagService } from "./tag.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TagEntity } from "./tag.entity";
import { MemberEntity } from "../member/member.entity";
import { MemberService } from "../member/member.service";

describe(TagService.name, () => {
  let service: TagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forRoot(), TypeOrmModule.forFeature([TagEntity, MemberEntity])],
      providers: [TagService, MemberService],
    }).compile();

    service = module.get<TagService>(TagService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
