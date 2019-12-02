import { Module } from "@nestjs/common";
import { WorkerController } from "./worker.controller";
import { WorkerService } from "./worker.service";
import { ConfigModule } from "./config/config.module";

@Module({
  imports: [ConfigModule],
  controllers: [WorkerController],
  providers: [WorkerService],
})
export class WorkerModule {}
