import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { UserEntity } from "./user/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth/auth.service";
import { ConfigService } from "./config/config.service";
import { UtilsService } from "./utils/utils.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { WORKER_QUEUE_NAME } from "@airlab/shared/lib/constants";

describe("AppController", () => {
  let controller: AppController;
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      controllers: [AppController],
      providers: [AppService, AuthService, ConfigService, UtilsService],
    }).compile();

    controller = module.get<AppController>(AppController);
    service = module.get<AppService>(AppService);
  });

  describe("root", () => {
    it('should return "Hello World!"', () => {
      expect(controller.getHello()).toBe("Hello World!");
    });
  });
});
