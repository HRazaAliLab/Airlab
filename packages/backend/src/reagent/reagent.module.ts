import { Module } from "@nestjs/common";
import { ReagentService } from "./reagent.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReagentEntity } from "./reagent.entity";
import { ReagentController } from "./reagent.controller";
import { MemberService } from "../member/member.service";
import { MemberEntity } from "../member/member.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ReagentEntity, MemberEntity])],
  providers: [ReagentService, MemberService],
  controllers: [ReagentController],
})
export class ReagentModule {}
