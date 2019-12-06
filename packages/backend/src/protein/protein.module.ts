import { Module } from "@nestjs/common";
import { ProteinService } from "./protein.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProteinEntity } from "./protein.entity";
import { ProteinController } from "./protein.controller";
import { MemberService } from "../member/member.service";
import { MemberEntity } from "../member/member.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProteinEntity, MemberEntity])],
  providers: [ProteinService, MemberService],
  controllers: [ProteinController],
})
export class ProteinModule {}
