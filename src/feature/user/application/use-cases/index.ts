import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';

import { LinkAccountToExistingUserUseCase } from './linkAccountToExistingUserUseCase';
import { UpdateUserUseCase } from './updateUser.usercase';

export * from './linkAccountToExistingUserUseCase';

export const USER_USE_CASES: Type<ICommandHandler>[] = [
  LinkAccountToExistingUserUseCase,
  UpdateUserUseCase,
];
