import { Module } from '@nestjs/common';
import { UserController } from './api/user.controller';
import { USER_USE_CASES } from './application/use-cases';
import { UserFacade } from './user.facade';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { UserRepository } from './db';
import { USER_ENTITIES } from './entities';
import { MentorSettingModule } from '../mentor-setting/mentor-setting.module';

@Module({
  imports: [
    TypeOrmModule.forFeature(USER_ENTITIES),
    CqrsModule,
    MentorSettingModule,
  ],
  controllers: [UserController],
  providers: [...USER_USE_CASES, UserFacade, UserRepository],
  exports: [UserFacade],
})
export class UserModule {}
