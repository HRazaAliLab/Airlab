import { Module } from "@nestjs/common";
import { SpeciesService } from "./species.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SpeciesEntity } from "./species.entity";
import { SpeciesController } from "./species.controller";
import { GroupUserService } from "../groupUser/groupUser.service";
import { GroupUserEntity } from "../groupUser/groupUser.entity";

@Module({
  imports: [TypeOrmModule.forFeature([SpeciesEntity, GroupUserEntity])],
  providers: [SpeciesService, GroupUserService],
  controllers: [SpeciesController],
})
export class SpeciesModule {}
