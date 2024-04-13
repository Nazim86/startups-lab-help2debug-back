import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from '../entities/session.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SessionRepository {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepo: Repository<Session>,
  ) {}

  async save(session: Session): Promise<Session> {
    return this.sessionRepo.save(session);
  }

  async findSessionByIssueId(issueId: string): Promise<Session | null> {
    return this.sessionRepo.findOne({ where: { issueId } });
  }
}
