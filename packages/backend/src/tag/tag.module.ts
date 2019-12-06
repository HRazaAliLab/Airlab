import { Module } from "@nestjs/common";
import { TagService } from "./tag.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TagEntity } from "./tag.entity";
import { TagController } from "./tag.controller";
import { MemberService } from "../member/member.service";
import { MemberEntity } from "../member/member.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity, MemberEntity])],
  providers: [TagService, MemberService],
  controllers: [TagController],
})
export class TagModule {}
