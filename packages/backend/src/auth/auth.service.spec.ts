import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { UtilsModule } from "../utils/utils.module";
import { ConfigModule } from "../config/config.module";
import { TypeOrmModule } from "@nestjs/typeorm";

describe(AuthService.name, () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
