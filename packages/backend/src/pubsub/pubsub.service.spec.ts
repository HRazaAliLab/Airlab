import { Test, TestingModule } from "@nestjs/testing";
import { PubSubService } from "./pubsub.service";
import { EventsModule } from "../events/events.module";
import { ConfigModule } from "../config/config.module";
import { TypeOrmModule } from "@nestjs/typeorm";

describe(PubSubService.name, () => {
  let service: PubSubService;

  const mockService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), ConfigModule, EventsModule],
      providers: [
        {
          provide: PubSubService,
          useValue: mockService,
        },
      ],
    }).compile();

    service = module.get<PubSubService>(PubSubService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
