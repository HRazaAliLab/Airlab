import { Module } from "@nestjs/common";
import { ValidationService } from "./validation.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ValidationEntity } from "./validation.entity";
import { ValidationController } from "./validation.controller";
import { GroupUserService } from "../groupUser/groupUser.service";
import { GroupUserEntity } from "../groupUser/groupUser.entity";
import { ValidationFileService } from "../validationFile/validationFile.service";
import { ValidationFileEntity } from "../validationFile/validationFile.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ValidationEntity, GroupUserEntity, ValidationFileEntity])],
  providers: [ValidationService, GroupUserService, ValidationFileService],
  controllers: [ValidationController],
})
export class ValidationModule {}
