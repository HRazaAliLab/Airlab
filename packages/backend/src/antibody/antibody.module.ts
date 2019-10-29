import { Module } from "@nestjs/common";
import { AntibodyService } from "./antibody.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AntibodyEntity } from "./antibody.entity";
import { AntibodyController } from "./antibody.controller";

@Module({
  imports: [TypeOrmModule.forFeature([AntibodyEntity])],
  providers: [AntibodyService],
  controllers: [AntibodyController],
})
export class AntibodyModule {}
