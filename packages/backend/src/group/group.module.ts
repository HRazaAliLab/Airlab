import { Module } from "@nestjs/common";
import { GroupService } from "./group.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GroupEntity } from "./group.entity";
import { GroupController } from "./group.controller";
import { MemberEntity } from "../member/member.entity";
import { MemberService } from "../member/member.service";
import { UserEntity } from "../user/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([GroupEntity, MemberEntity, UserEntity])],
  providers: [GroupService, MemberService],
  controllers: [GroupController],
})
export class GroupModule {}
