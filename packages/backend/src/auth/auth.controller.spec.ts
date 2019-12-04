import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "./auth.service";
import { ConfigService } from "../config/config.service";
import { UserEntity } from "../user/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { WORKER_QUEUE_NAME } from "@airlab/shared/lib/constants";
import { UtilsService } from "../utils/utils.service";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";

describe("AuthController", () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.register({}),
        UserModule,
        PassportModule,
        ClientsModule.register([
          {
            name: "WORKER_SERVICE",
            transport: Transport.RMQ,
            options: {
              urls: [`amqp://rabbitmq:5672`],
              prefetchCount: 1,
              queue: WORKER_QUEUE_NAME,
              queueOptions: { durable: false },
            },
          },
        ]),
      ],
      providers: [AuthService, ConfigService, UtilsService, LocalStrategy, JwtStrategy],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
