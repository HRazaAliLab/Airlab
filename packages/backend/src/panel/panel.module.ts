import { Module } from "@nestjs/common";
import { PanelService } from "./panel.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PanelEntity } from "./panel.entity";
import { PanelController } from "./panel.controller";
import { MemberModule } from "../member/member.module";
import { PanelElementModule } from "../panelElement/panelElement.module";

@Module({
  imports: [TypeOrmModule.forFeature([PanelEntity]), MemberModule, PanelElementModule],
  providers: [PanelService],
  controllers: [PanelController],
  exports: [PanelService],
})
export class PanelModule {}
