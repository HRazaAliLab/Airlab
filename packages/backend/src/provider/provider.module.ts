import { Module } from "@nestjs/common";
import { ProviderService } from "./provider.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProviderEntity } from "./provider.entity";
import { ProviderController } from "./provider.controller";
import { MemberService } from "../member/member.service";
import { MemberEntity } from "../member/member.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProviderEntity, MemberEntity])],
  providers: [ProviderService, MemberService],
  controllers: [ProviderController],
})
export class ProviderModule {}
