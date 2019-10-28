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

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => configService.typeOrmConfig,
      inject: [ConfigService],
    }),
    UserModule,
    GroupModule,
    GroupUserModule,
    AuthModule,
    UtilsModule,
    ProteinModule,
    PlateModule,
    PlateWellModule,
    ProviderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
