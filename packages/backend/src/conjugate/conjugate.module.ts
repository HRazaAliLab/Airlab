import { Module } from "@nestjs/common";
import { ConjugateService } from "./conjugate.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConjugateEntity } from "./conjugate.entity";
import { ConjugateController } from "./conjugate.controller";
import { GroupUserService } from "../groupUser/groupUser.service";
import { GroupUserEntity } from "../groupUser/groupUser.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ConjugateEntity, GroupUserEntity])],
  providers: [ConjugateService, GroupUserService],
  controllers: [ConjugateController],
})
export class ConjugateModule {}
