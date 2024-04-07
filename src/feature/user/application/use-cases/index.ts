import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';

import { LinkProviderUserToExistingUserUseCase } from './linkProviderUserToExistingUser.usecase';

export * from './linkProviderUserToExistingUser.usecase';

export const USER_USE_CASES: Type<ICommandHandler>[] = [
  LinkProviderUserToExistingUserUseCase,
];
