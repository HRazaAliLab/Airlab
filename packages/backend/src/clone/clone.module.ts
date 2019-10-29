import { Module } from "@nestjs/common";
import { CloneService } from "./clone.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CloneEntity } from "./clone.entity";
import { CloneController } from "./clone.controller";

@Module({
  imports: [TypeOrmModule.forFeature([CloneEntity])],
  providers: [CloneService],
  controllers: [CloneController],
})
export class CloneModule {}
