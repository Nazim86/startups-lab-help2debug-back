import { Module } from '@nestjs/common';
import { IssueService } from './issue.service';
import { IssueController } from './issue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ISSUE_ENTITIES } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature(ISSUE_ENTITIES)],
  controllers: [IssueController],
  providers: [IssueService],
})
export class IssueModule {}
