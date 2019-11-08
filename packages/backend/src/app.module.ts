import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "./config/config.module";
import { ConfigService } from "./config/config.service";
import { AuthModule } from "./auth/auth.module";
import { GroupModule } from "./group/group.module";
import { GroupUserModule } from "./groupUser/groupUser.module";
import { UtilsModule } from "./utils/utils.module";
import { ProteinModule } from "./protein/protein.module";
import { ProviderModule } from "./provider/provider.module";
import { SpeciesModule } from "./species/species.module";
import { TagModule } from "./tag/tag.module";
import { FileModule } from "./file/file.module";
import { CloneModule } from "./clone/clone.module";
import { ReagentModule } from "./reagent/reagent.module";
import { ConjugateModule } from "./conjugate/conjugate.module";
import { LotModule } from "./lot/lot.module";
import { PanelModule } from "./panel/panel.module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => configService.typeOrmConfig,
      inject: [ConfigService],
    }),
    ConfigModule,
    UserModule,
    GroupModule,
    GroupUserModule,
    AuthModule,
    UtilsModule,
    ProteinModule,
    ProviderModule,
    SpeciesModule,
    TagModule,
    FileModule,
    CloneModule,
    ReagentModule,
    ConjugateModule,
    PanelModule,
    LotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
