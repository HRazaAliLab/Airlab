import { Module } from "@nestjs/common";
import { ValidationService } from "./validation.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ValidationEntity } from "./validation.entity";
import { ValidationController } from "./validation.controller";
import { GroupUserService } from "../groupUser/groupUser.service";
import { GroupUserEntity } from "../groupUser/groupUser.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ValidationEntity, GroupUserEntity])],
  providers: [ValidationService, GroupUserService],
  controllers: [ValidationController],
})
export class ValidationModule {}
