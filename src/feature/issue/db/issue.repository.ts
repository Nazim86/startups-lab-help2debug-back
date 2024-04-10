import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Issue } from '../entities/issue.entity';

@Injectable()
export class IssueRepository {
  constructor(
    @InjectRepository(Issue) private readonly issueRepo: Repository<Issue>,
  ) {}

  async saveIssue(issue: Issue): Promise<Issue> {
    return this.issueRepo.save(issue);
  }
}
