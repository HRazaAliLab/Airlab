import { Module } from "@nestjs/common";
import { CloneService } from "./clone.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CloneEntity } from "./clone.entity";
import { CloneController } from "./clone.controller";
import { GroupUserService } from "../groupUser/groupUser.service";
import { GroupUserEntity } from "../groupUser/groupUser.entity";
import { RolesGuard } from "../auth/roles.guard";
import { UserEntity } from "../user/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CloneEntity, GroupUserEntity, UserEntity])],
  providers: [CloneService, GroupUserService, RolesGuard],
  controllers: [CloneController],
})
export class CloneModule {}
