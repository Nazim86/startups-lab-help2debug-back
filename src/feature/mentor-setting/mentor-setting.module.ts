import { Module } from '@nestjs/common';
import { MentorSettingService } from './mentor-setting.service';
import { MentorSettingController } from './mentor-setting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SETTING_ENTITIES } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature(SETTING_ENTITIES)],

  controllers: [MentorSettingController],
  providers: [MentorSettingService],
})
export class MentorSettingModule {}
