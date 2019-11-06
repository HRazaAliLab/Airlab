import { Module } from "@nestjs/common";
import { PanelService } from "./panel.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PanelEntity } from "./panel.entity";
import { PanelController } from "./panel.controller";
import { GroupUserService } from "../groupUser/groupUser.service";
import { GroupUserEntity } from "../groupUser/groupUser.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PanelEntity, GroupUserEntity])],
  providers: [PanelService, GroupUserService],
  controllers: [PanelController],
})
export class PanelModule {}
