import { Module } from "@nestjs/common";
import { TagService } from "./tag.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TagEntity } from "./tag.entity";
import { TagController } from "./tag.controller";
import { MemberModule } from "../member/member.module";

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity]), MemberModule],
  providers: [TagService],
  controllers: [TagController],
  exports: [TagService],
})
export class TagModule {}
