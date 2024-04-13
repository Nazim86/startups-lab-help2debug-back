import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { SessionQueryRepository } from './db/session.query.repository';
import { SessionRepository } from './db/session.repository';
import { CreateSessionUseCase } from './application/use-cases/createSession.usecase';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Session])],
  controllers: [SessionController],
  providers: [
    SessionService,
    SessionQueryRepository,
    SessionRepository,
    CreateSessionUseCase,
  ],
})
export class SessionModule {}
