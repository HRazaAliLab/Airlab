import { Module } from "@nestjs/common";
import { ReagentInstanceService } from "./reagentInstance.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReagentInstanceEntity } from "./reagentInstance.entity";
import { ReagentInstanceController } from "./reagentInstance.controller";

@Module({
  imports: [TypeOrmModule.forFeature([ReagentInstanceEntity])],
  providers: [ReagentInstanceService],
  controllers: [ReagentInstanceController],
})
export class ReagentInstanceModule {}
