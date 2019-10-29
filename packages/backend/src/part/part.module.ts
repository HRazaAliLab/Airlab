import { Module } from "@nestjs/common";
import { PartService } from "./part.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PartEntity } from "./part.entity";
import { PartController } from "./part.controller";

@Module({
  imports: [TypeOrmModule.forFeature([PartEntity])],
  providers: [PartService],
  controllers: [PartController],
})
export class PartModule {}
