import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { GroupEntity } from "../group/group.entity";
import { GroupUserEntity } from "../groupUser/groupUser.entity";
import { LotEntity } from "../lot/lot.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, GroupEntity, GroupUserEntity, LotEntity])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
