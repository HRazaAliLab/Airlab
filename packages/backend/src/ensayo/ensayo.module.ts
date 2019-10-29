import { Module } from "@nestjs/common";
import { EnsayoService } from "./ensayo.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnsayoEntity } from "./ensayo.entity";
import { EnsayoController } from "./ensayo.controller";

@Module({
  imports: [TypeOrmModule.forFeature([EnsayoEntity])],
  providers: [EnsayoService],
  controllers: [EnsayoController],
})
export class EnsayoModule {}
