import { Module } from "@nestjs/common";
import { ConjugateService } from "./conjugate.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConjugateEntity } from "./conjugate.entity";
import { ConjugateController } from "./conjugate.controller";

@Module({
  imports: [TypeOrmModule.forFeature([ConjugateEntity])],
  providers: [ConjugateService],
  controllers: [ConjugateController],
})
export class ConjugateModule {}
