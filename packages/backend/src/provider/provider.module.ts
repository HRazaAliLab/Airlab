import { Module } from "@nestjs/common";
import { ProviderService } from "./provider.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProviderEntity } from "./provider.entity";
import { ProviderController } from "./provider.controller";

@Module({
  imports: [TypeOrmModule.forFeature([ProviderEntity])],
  providers: [ProviderService],
  controllers: [ProviderController],
})
export class ProviderModule {}
