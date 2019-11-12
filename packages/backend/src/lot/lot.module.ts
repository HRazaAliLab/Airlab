import { Module } from "@nestjs/common";
import { LotService } from "./lot.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LotEntity } from "./lot.entity";
import { LotController } from "./lot.controller";
import { GroupUserService } from "../groupUser/groupUser.service";
import { GroupUserEntity } from "../groupUser/groupUser.entity";

@Module({
  imports: [TypeOrmModule.forFeature([LotEntity, GroupUserEntity])],
  providers: [LotService, GroupUserService],
  controllers: [LotController],
})
export class LotModule {}
