import { Module } from "@nestjs/common";
import { ReagentService } from "./reagent.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReagentEntity } from "./reagent.entity";
import { ReagentController } from "./reagent.controller";
import { GroupUserService } from "../groupUser/groupUser.service";
import { GroupUserEntity } from "../groupUser/groupUser.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ReagentEntity, GroupUserEntity])],
  providers: [ReagentService, GroupUserService],
  controllers: [ReagentController],
})
export class ReagentModule {}
