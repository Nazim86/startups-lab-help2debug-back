import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Issue } from '../entities/issue.entity';
import { NotFoundError } from '../../../core/config/exceptions';
import { Result } from '../../../core/result';

@Injectable()
export class IssueRepository {
  constructor(
    @InjectRepository(Issue) private readonly issueRepo: Repository<Issue>,
  ) {}

  async saveIssue(issue: Issue): Promise<Issue> {
    return this.issueRepo.save(issue);
  }

  async getIssueById(id: string): Promise<Issue> {
    return this.issueRepo
      .createQueryBuilder('i')
      .leftJoinAndSelect('i.user', 'u')
      .where('i.id = :id', { id })
      .getOne();
  }
}

// try {
//   const savedEntity = await this.issueRepo.save(issue);
//   if (!savedEntity) {
//     return Result.Err(new NotFoundError('Entity not saved'));
//   }
//   return savedEntity;
// } catch (error) {
//   // Log error
//   console.error('Error saving entity:', error);
//   // Rethrow the error if it's not a known error
//   if (!(error instanceof NotFoundException)) {
//     throw new InternalServerErrorException('Failed to save entity');
//   }
//   throw error; // Re-throw known errors
// }

//TODO: Is there need to cover with try/catch?
