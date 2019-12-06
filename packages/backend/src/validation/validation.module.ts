import { Module } from "@nestjs/common";
import { ValidationService } from "./validation.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ValidationEntity } from "./validation.entity";
import { ValidationController } from "./validation.controller";
import { MemberService } from "../member/member.service";
import { MemberEntity } from "../member/member.entity";
import { ValidationFileService } from "../validationFile/validationFile.service";
import { ValidationFileEntity } from "../validationFile/validationFile.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ValidationEntity, MemberEntity, ValidationFileEntity])],
  providers: [ValidationService, MemberService, ValidationFileService],
  controllers: [ValidationController],
})
export class ValidationModule {}
