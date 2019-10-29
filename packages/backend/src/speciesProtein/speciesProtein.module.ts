import { Module } from "@nestjs/common";
import { SpeciesProteinService } from "./speciesProtein.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SpeciesProteinEntity } from "./speciesProtein.entity";
import { SpeciesProteinController } from "./speciesProtein.controller";

@Module({
  imports: [TypeOrmModule.forFeature([SpeciesProteinEntity])],
  providers: [SpeciesProteinService],
  controllers: [SpeciesProteinController],
})
export class SpeciesProteinModule {}
