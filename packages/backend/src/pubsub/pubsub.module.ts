import { Module } from "@nestjs/common";
import { PubSubService } from "./pubsub.service";
import { EventsModule } from "../events/events.module";

@Module({
  imports: [EventsModule],
  providers: [PubSubService],
  exports: [PubSubService],
})
export class PubSubModule {}
