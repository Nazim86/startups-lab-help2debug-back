import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';

import { LinkProviderUserToExistingUserUseCase } from './linkProviderUserToExistingUser.usecase';
import { Device } from '../../../device/entities/device.entity';
import { User } from '../../entities/user.entity';
import { Account } from '../../entities/account.entity';

export * from './linkProviderUserToExistingUser.usecase';

export const USER_USE_CASES: Type<ICommandHandler>[] = [
  LinkProviderUserToExistingUserUseCase,
];

export const USER_ENTITIES = [User, Account];
