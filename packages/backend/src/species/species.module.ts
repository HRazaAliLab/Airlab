import { Module } from "@nestjs/common";
import { SpeciesService } from "./species.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SpeciesEntity } from "./species.entity";
import { SpeciesController } from "./species.controller";
import { MemberService } from "../member/member.service";
import { MemberEntity } from "../member/member.entity";

@Module({
  imports: [TypeOrmModule.forFeature([SpeciesEntity, MemberEntity])],
  providers: [SpeciesService, MemberService],
  controllers: [SpeciesController],
})
export class SpeciesModule {}
