import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "../config/config.service";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";
import { UtilsService } from "../utils/utils.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { WORKER_QUEUE_NAME } from "@airlab/shared/lib/constants";
import { AuthController } from "./auth.controller";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.jwtSecret,
      }),
      inject: [ConfigService],
    }),
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
    UserModule,
  ],
  providers: [AuthService, UtilsService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
