import { Module } from "@nestjs/common";
import { GroupService } from "./group.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GroupEntity } from "./group.entity";
import { GroupController } from "./group.controller";
import { GroupUserEntity } from "../groupUser/groupUser.entity";
import { GroupUserService } from "../groupUser/groupUser.service";
import { UtilsService } from "../utils/utils.service";

@Module({
  imports: [TypeOrmModule.forFeature([GroupEntity, GroupUserEntity])],
  providers: [GroupService, GroupUserService, UtilsService],
  controllers: [GroupController],
})
export class GroupModule {}