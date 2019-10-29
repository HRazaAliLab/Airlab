import { Module } from "@nestjs/common";
import { PanelService } from "./panel.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PanelEntity } from "./panel.entity";
import { PanelController } from "./panel.controller";

@Module({
  imports: [TypeOrmModule.forFeature([PanelEntity])],
  providers: [PanelService],
  controllers: [PanelController],
})
export class PanelModule {}
