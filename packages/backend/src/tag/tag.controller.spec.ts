import { Test, TestingModule } from "@nestjs/testing";
import { TagController } from "./tag.controller";
import { TagService } from "./tag.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TagEntity } from "./tag.entity";
import { MemberModule } from "../member/member.module";
import { ConjugateModule } from "../conjugate/conjugate.module";

describe(TagController.name, () => {
  let controller: TagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([TagEntity]), MemberModule, ConjugateModule],
      providers: [TagService],
      controllers: [TagController],
    }).compile();

    controller = module.get<TagController>(TagController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
