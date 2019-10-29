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
import { PlateModule } from "./plate/plate.module";
import { PlateWellModule } from "./plateWell/plateWell.module";
import { ProviderModule } from "./provider/provider.module";
import { SpeciesModule } from "./species/species.module";
import { TagModule } from "./tag/tag.module";
import { SpeciesProteinModule } from "./speciesProtein/speciesProtein.module";
import { FileModule } from "./file/file.module";
import { CloneModule } from "./clone/clone.module";
import { CommercialReagentModule } from "./commercialReagent/commercialReagent.module";
import { AntibodyModule } from "./antibody/antibody.module";
import { EnsayoModule } from "./ensayo/ensayo.module";
import { PlaceModule } from "./place/place.module";
import { PartModule } from "./part/part.module";
import { RecipeModule } from "./recipe/recipe.module";
import { ReagentInstanceModule } from "./reagentInstance/reagentInstance.module";

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
    PlateModule,
    PlateWellModule,
    ProviderModule,
    SpeciesModule,
    TagModule,
    SpeciesProteinModule,
    FileModule,
    CloneModule,
    CommercialReagentModule,
    AntibodyModule,
    EnsayoModule,
    PlaceModule,
    PartModule,
    RecipeModule,
    ReagentInstanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
