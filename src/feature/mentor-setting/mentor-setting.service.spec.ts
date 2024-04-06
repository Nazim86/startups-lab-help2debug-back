import { Test, TestingModule } from '@nestjs/testing';
import { MentorSettingService } from './mentor-setting.service';

describe('MentorSettingService', () => {
  let service: MentorSettingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MentorSettingService],
    }).compile();

    service = module.get<MentorSettingService>(MentorSettingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
