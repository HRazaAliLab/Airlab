import { Module } from "@nestjs/common";
import { GroupUserService } from "./groupUser.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GroupUserEntity } from "./groupUser.entity";

@Module({
  imports: [TypeOrmModule.forFeature([GroupUserEntity])],
  providers: [GroupUserService],
})
export class GroupUserModule {}
