import { Module } from "@nestjs/common";
import { SpeciesService } from "./species.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SpeciesEntity } from "./species.entity";
import { SpeciesController } from "./species.controller";
import { MemberModule } from "../member/member.module";

@Module({
  imports: [TypeOrmModule.forFeature([SpeciesEntity]), MemberModule],
  providers: [SpeciesService],
  controllers: [SpeciesController],
  exports: [SpeciesService],
})
export class SpeciesModule {}
