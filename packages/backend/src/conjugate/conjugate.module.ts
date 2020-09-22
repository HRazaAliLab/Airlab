import { Module } from "@nestjs/common";
import { ConjugateService } from "./conjugate.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConjugateEntity } from "./conjugate.entity";
import { ConjugateController } from "./conjugate.controller";
import { MemberModule } from "../member/member.module";
import { ValidationModule } from "../validation/validation.module";

@Module({
  imports: [TypeOrmModule.forFeature([ConjugateEntity]), MemberModule, ValidationModule],
  providers: [ConjugateService],
  controllers: [ConjugateController],
  exports: [ConjugateService],
})
export class ConjugateModule {}
