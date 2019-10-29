import { Module } from "@nestjs/common";
import { PlaceService } from "./place.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlaceEntity } from "./place.entity";
import { PlaceController } from "./place.controller";

@Module({
  imports: [TypeOrmModule.forFeature([PlaceEntity])],
  providers: [PlaceService],
  controllers: [PlaceController],
})
export class PlaceModule {}
