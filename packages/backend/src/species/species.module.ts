import { Module } from "@nestjs/common";
import { SpeciesService } from "./species.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SpeciesEntity } from "./species.entity";
import { SpeciesController } from "./species.controller";

@Module({
  imports: [TypeOrmModule.forFeature([SpeciesEntity])],
  providers: [SpeciesService],
  controllers: [SpeciesController],
})
export class SpeciesModule {}
