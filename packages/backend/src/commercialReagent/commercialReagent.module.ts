import { Module } from "@nestjs/common";
import { CommercialReagentService } from "./commercialReagent.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommercialReagentEntity } from "./commercialReagent.entity";
import { CommercialReagentController } from "./commercialReagent.controller";

@Module({
  imports: [TypeOrmModule.forFeature([CommercialReagentEntity])],
  providers: [CommercialReagentService],
  controllers: [CommercialReagentController],
})
export class CommercialReagentModule {}
