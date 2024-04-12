import { Module } from '@nestjs/common';
import { MentorSettingController } from './api/mentor-setting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SETTING_ENTITIES } from './entities';
import { UpdateMentorSettingsUseCase } from './application/use-case/updateMentorSettings.usecase';
import { MentorSettingRepository } from './db/mentorSetting.repository';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature(SETTING_ENTITIES)],

  controllers: [MentorSettingController],
  providers: [UpdateMentorSettingsUseCase, MentorSettingRepository],
  exports: [MentorSettingRepository],
})
export class MentorSettingModule {}
