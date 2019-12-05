import { Module } from "@nestjs/common";
import { TagService } from "./tag.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TagEntity } from "./tag.entity";
import { TagController } from "./tag.controller";
import { GroupUserService } from "../groupUser/groupUser.service";
import { GroupUserEntity } from "../groupUser/groupUser.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity, GroupUserEntity])],
  providers: [TagService, GroupUserService],
  controllers: [TagController],
})
export class TagModule {}
