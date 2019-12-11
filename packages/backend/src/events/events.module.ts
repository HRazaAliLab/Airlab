import { Module } from "@nestjs/common";
import { EventsGateway } from "./events.gateway";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "../config/config.service";

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.jwtSecret,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EventsGateway],
})
export class EventsModule {}
