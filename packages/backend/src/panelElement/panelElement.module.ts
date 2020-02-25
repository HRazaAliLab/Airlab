import { Module } from "@nestjs/common";
import { PanelElementService } from "./panelElement.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PanelElementEntity } from "./panelElement.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PanelElementEntity])],
  providers: [PanelElementService],
  exports: [PanelElementService],
})
export class PanelElementModule {}
