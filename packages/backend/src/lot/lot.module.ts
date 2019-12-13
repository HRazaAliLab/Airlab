import { Module } from "@nestjs/common";
import { LotService } from "./lot.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LotEntity } from "./lot.entity";
import { LotController } from "./lot.controller";
import { MemberModule } from "../member/member.module";
import { ConjugateModule } from "../conjugate/conjugate.module";

@Module({
  imports: [TypeOrmModule.forFeature([LotEntity]), MemberModule, ConjugateModule],
  providers: [LotService],
  controllers: [LotController],
  exports: [LotService],
})
export class LotModule {}
