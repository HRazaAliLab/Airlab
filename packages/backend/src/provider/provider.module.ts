import { Module } from "@nestjs/common";
import { ProviderService } from "./provider.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProviderEntity } from "./provider.entity";
import { ProviderController } from "./provider.controller";
import { MemberModule } from "../member/member.module";
import { ReagentModule } from "../reagent/reagent.module";

@Module({
  imports: [TypeOrmModule.forFeature([ProviderEntity]), MemberModule, ReagentModule],
  providers: [ProviderService],
  controllers: [ProviderController],
  exports: [ProviderService],
})
export class ProviderModule {}
