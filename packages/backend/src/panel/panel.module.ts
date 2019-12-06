import { Module } from "@nestjs/common";
import { PanelService } from "./panel.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PanelEntity } from "./panel.entity";
import { PanelController } from "./panel.controller";
import { MemberService } from "../member/member.service";
import { MemberEntity } from "../member/member.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PanelEntity, MemberEntity])],
  providers: [PanelService, MemberService],
  controllers: [PanelController],
})
export class PanelModule {}
