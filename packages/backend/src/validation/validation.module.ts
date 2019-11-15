import { Module } from "@nestjs/common";
import { ValidationService } from "./validation.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ValidationEntity } from "./validation.entity";
import { ValidationController } from "./validation.controller";

@Module({
  imports: [TypeOrmModule.forFeature([ValidationEntity])],
  providers: [ValidationService],
  controllers: [ValidationController],
})
export class ValidationModule {}
