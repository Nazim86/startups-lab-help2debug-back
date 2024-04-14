import { Module } from '@nestjs/common';
import { IssueService } from './issue.service';
import { IssueController } from './api/issue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ISSUE_ENTITIES } from './entities';
import { ISSUE_USE_CASES } from './application/use-cases';
import { IssueRepository } from './db/issue.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { UserModule } from '../user/user.module';
import { HashtagModule } from '../hashtag/hashtag.module';
import { IssueQueryRepository } from './db/issue.query.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature(ISSUE_ENTITIES),
    CqrsModule,
    UserModule,
    HashtagModule,
  ],
  controllers: [IssueController],
  providers: [
    IssueService,
    ...ISSUE_USE_CASES,
    IssueRepository,
    IssueQueryRepository,
  ],
  exports: [IssueRepository], //TODO: need to do using Facade?
})
export class IssueModule {}
