import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from '../entities/session.entity';
import { Repository } from 'typeorm';
import { CreateSessionResponseDto } from '../responses';
import { Result } from '../../../core/result';
import { NotFoundError } from '../../../core/config/exceptions';
import { SESSION_NOT_FOUND } from '../session.constant';

@Injectable()
export class SessionQueryRepository {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepo: Repository<Session>,
  ) {}

  async getSessionViewById(
    sessionId: string,
  ): Promise<Result<CreateSessionResponseDto>> {
    const session = await this.sessionRepo.findOne({
      where: { id: sessionId },
    });

    if (!session) {
      return Result.Err(new NotFoundError(SESSION_NOT_FOUND));
    }

    const sessionView: CreateSessionResponseDto = {
      id: session.id,
      issueId: session.issueId,
      code: session.code,
    };

    return Result.Ok(sessionView);
  }
}
