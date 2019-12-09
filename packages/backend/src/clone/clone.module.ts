import { Module } from "@nestjs/common";
import { CloneService } from "./clone.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CloneEntity } from "./clone.entity";
import { CloneController } from "./clone.controller";
import { MemberService } from "../member/member.service";
import { MemberEntity } from "../member/member.entity";
import { UserEntity } from "../user/user.entity";
import { LotService } from "../lot/lot.service";
import { LotEntity } from "../lot/lot.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CloneEntity, MemberEntity, UserEntity, LotEntity])],
  providers: [CloneService, MemberService, LotService],
  controllers: [CloneController],
})
export class CloneModule {}
