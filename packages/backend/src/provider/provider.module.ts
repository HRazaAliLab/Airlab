import { Module } from "@nestjs/common";
import { ProviderService } from "./provider.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProviderEntity } from "./provider.entity";
import { ProviderController } from "./provider.controller";
import { MemberModule } from "../member/member.module";

@Module({
  imports: [TypeOrmModule.forFeature([ProviderEntity]), MemberModule],
  providers: [ProviderService],
  controllers: [ProviderController],
  exports: [ProviderService],
})
export class ProviderModule {}
