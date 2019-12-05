import { Module } from "@nestjs/common";
import { ProviderService } from "./provider.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProviderEntity } from "./provider.entity";
import { ProviderController } from "./provider.controller";
import { GroupUserService } from "../groupUser/groupUser.service";
import { GroupUserEntity } from "../groupUser/groupUser.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProviderEntity, GroupUserEntity])],
  providers: [ProviderService, GroupUserService],
  controllers: [ProviderController],
})
export class ProviderModule {}
