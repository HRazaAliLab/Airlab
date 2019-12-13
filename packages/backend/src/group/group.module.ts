import { Module } from "@nestjs/common";
import { GroupService } from "./group.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GroupEntity } from "./group.entity";
import { GroupController } from "./group.controller";
import { AuthModule } from "../auth/auth.module";
import { PubSubModule } from "../pubsub/pubsub.module";
import { EventsModule } from "../events/events.module";
import { MemberModule } from "../member/member.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([GroupEntity]), AuthModule, PubSubModule, EventsModule, UserModule, MemberModule],
  providers: [GroupService],
  controllers: [GroupController],
  exports: [GroupService],
})
export class GroupModule {}
