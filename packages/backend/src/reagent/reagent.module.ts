import { Module } from "@nestjs/common";
import { ReagentService } from "./reagent.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReagentEntity } from "./reagent.entity";
import { ReagentController } from "./reagent.controller";

@Module({
  imports: [TypeOrmModule.forFeature([ReagentEntity])],
  providers: [ReagentService],
  controllers: [ReagentController],
})
export class ReagentModule {}
