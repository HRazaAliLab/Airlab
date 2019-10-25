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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
