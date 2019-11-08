import { Module } from "@nestjs/common";
import { LotService } from "./lot.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LotEntity } from "./lot.entity";
import { LotController } from "./lot.controller";

@Module({
  imports: [TypeOrmModule.forFeature([LotEntity])],
  providers: [LotService],
  controllers: [LotController],
})
export class LotModule {}
