import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { CreateSessionUseCase } from './createSession.usecase';
import { ConnectToSessionUseCase } from './connectToSession.usecase';

export * from './createSession.usecase';
export * from './connectToSession.usecase';

export const SESSION_USE_CASES: Type<ICommandHandler>[] = [
  CreateSessionUseCase,
  ConnectToSessionUseCase,
];
