import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Issue } from '../entities/issue.entity';
import { IssueResponseDto } from '../responses';

@Injectable()
export class IssueQueryRepository {
  constructor(
    @InjectRepository(Issue) private readonly issueRepo: Repository<Issue>,
  ) {}

  async getIssuesForUser(userId: string) {
    const issues = await this.issueRepo
      .createQueryBuilder('i')
      .leftJoinAndSelect('i.user', 'u')
      .leftJoinAndSelect('i.hashtag', 'h')
      .where('u.id = :userId', { userId })
      .getMany();

    return this.mapIssueView(issues);
  }

  private mapIssueView(issues: Issue[]): IssueResponseDto[] {
    return issues.map((issue: Issue): IssueResponseDto => {
      const hashtags = issue.hashtag.map((h) => {
        return {
          id: h.id,
          title: h.title,
          normalized: h.normalized,
        };
      });
      return {
        id: issue.id,
        type: issue.type,
        title: issue.title,
        description: issue.description,
        hashtag: hashtags,
      };
    });
  }
}
