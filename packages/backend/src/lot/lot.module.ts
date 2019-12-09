import { Module } from "@nestjs/common";
import { LotService } from "./lot.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LotEntity } from "./lot.entity";
import { LotController } from "./lot.controller";
import { MemberService } from "../member/member.service";
import { MemberEntity } from "../member/member.entity";
import { ConjugateService } from "../conjugate/conjugate.service";
import { ConjugateEntity } from "../conjugate/conjugate.entity";

@Module({
  imports: [TypeOrmModule.forFeature([LotEntity, MemberEntity, ConjugateEntity])],
  providers: [LotService, MemberService, ConjugateService],
  controllers: [LotController],
})
export class LotModule {}
