import { Module } from "@nestjs/common";
import { GroupService } from "./group.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GroupEntity } from "./group.entity";
import { GroupController } from "./group.controller";
import { MemberEntity } from "../member/member.entity";
import { MemberService } from "../member/member.service";
import { UserEntity } from "../user/user.entity";
import { PubSubService } from "../pubsub/pubsub.service";
import { EventsGateway } from "../events/events.gateway";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "../config/config.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupEntity, MemberEntity, UserEntity]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.jwtSecret,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [GroupService, MemberService, PubSubService, EventsGateway],
  controllers: [GroupController],
})
export class GroupModule {}
