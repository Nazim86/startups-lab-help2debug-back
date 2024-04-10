import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';

import { LinkAccountToExistingUserUseCase } from './linkAccountToExistingUserUseCase';

export * from './linkAccountToExistingUserUseCase';

export const USER_USE_CASES: Type<ICommandHandler>[] = [
  LinkAccountToExistingUserUseCase,
];
