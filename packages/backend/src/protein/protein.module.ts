import { Module } from "@nestjs/common";
import { ProteinService } from "./protein.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProteinEntity } from "./protein.entity";
import { ProteinController } from "./protein.controller";

@Module({
  imports: [TypeOrmModule.forFeature([ProteinEntity])],
  providers: [ProteinService],
  controllers: [ProteinController],
})
export class ProteinModule {}
