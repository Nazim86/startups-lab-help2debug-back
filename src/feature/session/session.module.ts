import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { SessionQueryRepository } from './db/session.query.repository';
import { SessionRepository } from './db/session.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { SESSION_USE_CASES } from './application';
import { IssueModule } from '../issue/issue.module';
import { MentorSettingModule } from '../mentor-setting/mentor-setting.module';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Session]),
    IssueModule,
    MentorSettingModule,
  ],
  controllers: [SessionController],
  providers: [
    SessionService,
    SessionQueryRepository,
    SessionRepository,
    ...SESSION_USE_CASES,
  ],
})
export class SessionModule {}
