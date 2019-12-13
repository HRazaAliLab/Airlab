import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { UtilsModule } from "../utils/utils.module";
import { ConfigModule } from "../config/config.module";
import { TypeOrmModule } from "@nestjs/typeorm";

describe(AuthController.name, () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [
        TypeOrmModule.forRoot(),
        PassportModule.register({ defaultStrategy: "jwt" }),
        JwtModule.register({}),
        UserModule,
        UtilsModule,
        ConfigModule,
      ],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
