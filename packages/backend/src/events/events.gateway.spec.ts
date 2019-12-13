import { Test, TestingModule } from "@nestjs/testing";
import { EventsGateway } from "./events.gateway";
import { AuthModule } from "../auth/auth.module";
import { ConfigModule } from "../config/config.module";
import { TypeOrmModule } from "@nestjs/typeorm";

describe(EventsGateway.name, () => {
  let gateway: EventsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), ConfigModule, AuthModule],
      providers: [EventsGateway],
    }).compile();

    gateway = module.get<EventsGateway>(EventsGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
