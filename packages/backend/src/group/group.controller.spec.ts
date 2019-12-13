import { Test, TestingModule } from "@nestjs/testing";
import { GroupController } from "./group.controller";
import { GroupService } from "./group.service";
import { AuthModule } from "../auth/auth.module";
import { ConfigModule } from "../config/config.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user/user.module";

describe(GroupController.name, () => {
  let controller: GroupController;

  const mockService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), AuthModule, ConfigModule, UserModule],
      providers: [
        {
          provide: GroupService,
          useValue: mockService,
        },
      ],
      controllers: [GroupController],
    }).compile();

    controller = module.get<GroupController>(GroupController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
