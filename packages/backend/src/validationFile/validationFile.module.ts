import { Module } from "@nestjs/common";
import { ValidationFileService } from "./validationFile.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ValidationFileEntity } from "./validationFile.entity";
import { ValidationFileController } from "./validationFile.controller";

@Module({
  imports: [TypeOrmModule.forFeature([ValidationFileEntity])],
  providers: [ValidationFileService],
  controllers: [ValidationFileController],
})
export class ValidationFileModule {}
