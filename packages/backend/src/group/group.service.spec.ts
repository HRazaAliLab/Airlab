import { Test, TestingModule } from "@nestjs/testing";
import { GroupService } from "./group.service";

describe(GroupService.name, () => {
  let service: GroupService;

  const mockService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: GroupService,
          useValue: mockService,
        },
      ],
    }).compile();

    service = module.get<GroupService>(GroupService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
