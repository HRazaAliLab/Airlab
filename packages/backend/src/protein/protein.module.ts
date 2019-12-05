import { Module } from "@nestjs/common";
import { ProteinService } from "./protein.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProteinEntity } from "./protein.entity";
import { ProteinController } from "./protein.controller";
import { GroupUserService } from "../groupUser/groupUser.service";
import { GroupUserEntity } from "../groupUser/groupUser.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProteinEntity, GroupUserEntity])],
  providers: [ProteinService, GroupUserService],
  controllers: [ProteinController],
})
export class ProteinModule {}
