import { Module } from "@nestjs/common";
import { PlateService } from "./plate.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlateEntity } from "./plate.entity";
import { PlateController } from "./plate.controller";

@Module({
  imports: [TypeOrmModule.forFeature([PlateEntity])],
  providers: [PlateService],
  controllers: [PlateController],
})
export class PlateModule {}
