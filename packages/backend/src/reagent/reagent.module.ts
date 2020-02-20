import { Module } from "@nestjs/common";
import { ReagentService } from "./reagent.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReagentEntity } from "./reagent.entity";
import { ReagentController } from "./reagent.controller";
import { MemberModule } from "../member/member.module";
import { LotModule } from "../lot/lot.module";

@Module({
  imports: [TypeOrmModule.forFeature([ReagentEntity]), MemberModule, LotModule],
  providers: [ReagentService],
  controllers: [ReagentController],
  exports: [ReagentService],
})
export class ReagentModule {}
