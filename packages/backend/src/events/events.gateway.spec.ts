import { Test, TestingModule } from "@nestjs/testing";
import { EventsGateway } from "./events.gateway";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "../config/config.service";
import { ConfigModule } from "../config/config.module";

describe("EventsGateway", () => {
  let gateway: EventsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.registerAsync({
          useFactory: async (configService: ConfigService) => ({
            secret: configService.jwtSecret,
          }),
          inject: [ConfigService],
        }),
        ConfigModule,
      ],
      providers: [EventsGateway],
    }).compile();

    gateway = module.get<EventsGateway>(EventsGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
