import { Module } from "@nestjs/common";
import { CloneService } from "./clone.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CloneEntity } from "./clone.entity";
import { CloneController } from "./clone.controller";
import { MemberModule } from "../member/member.module";
import { LotModule } from "../lot/lot.module";
import { ValidationModule } from "../validation/validation.module";
import { ConjugateModule } from "../conjugate/conjugate.module";

@Module({
  imports: [TypeOrmModule.forFeature([CloneEntity]), MemberModule, LotModule, ConjugateModule, ValidationModule],
  providers: [CloneService],
  controllers: [CloneController],
  exports: [CloneService],
})
export class CloneModule {}
