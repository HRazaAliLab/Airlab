import { Module } from "@nestjs/common";
import { PlateWellService } from "./plateWell.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlateWellEntity } from "./plateWell.entity";
import { PlateWellController } from "./plateWell.controller";

@Module({
  imports: [TypeOrmModule.forFeature([PlateWellEntity])],
  providers: [PlateWellService],
  controllers: [PlateWellController],
})
export class PlateWellModule {}
