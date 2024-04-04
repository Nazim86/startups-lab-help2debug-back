import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { GitHubLoginUseCase } from './githubLogin.usecase';

export const AUTH_USE_CASES: Type<ICommandHandler>[] = [GitHubLoginUseCase];
