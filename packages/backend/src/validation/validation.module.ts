import { Module } from "@nestjs/common";
import { ValidationService } from "./validation.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ValidationEntity } from "./validation.entity";
import { ValidationController } from "./validation.controller";
import { MemberModule } from "../member/member.module";
import { ValidationFileModule } from "../validationFile/validationFile.module";

@Module({
  imports: [TypeOrmModule.forFeature([ValidationEntity]), MemberModule, ValidationFileModule],
  providers: [ValidationService],
  controllers: [ValidationController],
  exports: [ValidationService],
})
export class ValidationModule {}
