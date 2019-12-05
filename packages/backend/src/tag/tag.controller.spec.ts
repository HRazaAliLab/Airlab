import { Test, TestingModule } from "@nestjs/testing";
import { TagController } from "./tag.controller";
import { TagService } from "./tag.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TagEntity } from "./tag.entity";
import { GroupUserEntity } from "../groupUser/groupUser.entity";
import { GroupUserService } from "../groupUser/groupUser.service";

describe("TagController", () => {
  let controller: TagController;
  let service: TagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([TagEntity, GroupUserEntity])],
      controllers: [TagController],
      providers: [TagService, GroupUserService],
    }).compile();

    controller = module.get<TagController>(TagController);
    service = module.get<TagService>(TagService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
