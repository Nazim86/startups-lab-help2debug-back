import { ICommandHandler } from '@nestjs/cqrs';
import { Type } from '@nestjs/common';
import { CreateIssueUseCase } from './createIssue.usecase';

export * from './createIssue.usecase';

export const ISSUE_USE_CASES: Type<ICommandHandler>[] = [CreateIssueUseCase];
