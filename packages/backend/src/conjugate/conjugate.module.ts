import { Module } from "@nestjs/common";
import { ConjugateService } from "./conjugate.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConjugateEntity } from "./conjugate.entity";
import { ConjugateController } from "./conjugate.controller";
import { MemberService } from "../member/member.service";
import { MemberEntity } from "../member/member.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ConjugateEntity, MemberEntity])],
  providers: [ConjugateService, MemberService],
  controllers: [ConjugateController],
})
export class ConjugateModule {}
