import { Module } from "@nestjs/common";
import { GroupService } from "./group.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GroupEntity } from "./group.entity";
import { GroupController } from "./group.controller";
import { AuthModule } from "../auth/auth.module";
import { PubSubModule } from "../pubsub/pubsub.module";
import { EventsModule } from "../events/events.module";
import { MemberModule } from "../member/member.module";
import { UserModule } from "../user/user.module";
import { SpeciesModule } from "../species/species.module";
import { TagModule } from "../tag/tag.module";
import { ProviderModule } from "../provider/provider.module";
import { ProteinModule } from "../protein/protein.module";
import { CloneModule } from "../clone/clone.module";
import { LotModule } from "../lot/lot.module";
import { ConjugateModule } from "../conjugate/conjugate.module";
import { PanelModule } from "../panel/panel.module";
import { PanelElementModule } from "../panelElement/panelElement.module";
import { ValidationModule } from "../validation/validation.module";
import { ValidationFileModule } from "../validationFile/validationFile.module";
import { ConfigModule } from "../config/config.module";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([GroupEntity]),
    AuthModule,
    PubSubModule,
    EventsModule,
    UserModule,
    MemberModule,
    SpeciesModule,
    TagModule,
    ProviderModule,
    ProteinModule,
    CloneModule,
    LotModule,
    ConjugateModule,
    PanelModule,
    PanelElementModule,
    ValidationModule,
    ValidationFileModule,
  ],
  providers: [GroupService],
  controllers: [GroupController],
  exports: [GroupService],
})
export class GroupModule {}
