import { Module } from "@nestjs/common";
import { ExperimentService } from "./experiment.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExperimentEntity } from "./experiment.entity";
import { ExperimentController } from "./experiment.controller";

@Module({
  imports: [TypeOrmModule.forFeature([ExperimentEntity])],
  providers: [ExperimentService],
  controllers: [ExperimentController],
})
export class ExperimentModule {}
