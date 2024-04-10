import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UserRepository } from './db';
import {
  UpdateUserProviderByProviderIdData,
  UpdateUserProviderByProviderIdParams,
} from './types';
import { Result } from '../../core/result';
import { AccountResponse } from '../auth/response';
import { LinkAccountToExistingUserCommand } from './application/use-cases';
import { Provider } from './entities/account.enum';

@Injectable()
export class UserFacade {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly userRepo: UserRepository,
  ) {}

  repository = {
    findAccountByProviderId: (providerUserId: string, provider: Provider) =>
      this.findUserProviderByProviderId(providerUserId, provider),
    updateAccountByProviderId: (
      params: UpdateUserProviderByProviderIdParams,
      data: UpdateUserProviderByProviderIdData,
    ) => this.updateAccountByProviderId(params, data),
    findUserById: (userId: string) => this.findUserById(userId),
  };

  useCases = {
    // createUser: (userDto: CreateUserDto) => this.createUser(userDto),
    // checkUserCredentials: (loginDto: LoginDto): Promise<Result<UserId>> =>
    //   this.checkUserCredentials(loginDto),
    linkAccountToExistingUser: (
      provider: Provider,
      userData: AccountResponse,
    ): Promise<Result<string>> =>
      this.linkAccountToExistingUser(provider, userData),
  };
  //queries = { getUserViewById: (id: string) => this.getUserViewById(id) };

  // private async createUser(userDto: CreateUserDto): Promise<Result<User>> {
  //   return this.commandBus.execute<CreateUserCommand, Result<User>>(
  //     new CreateUserCommand(userDto),
  //   );
  // }

  // private async checkUserCredentials(loginDto: LoginDto) {
  //   return this.commandBus.execute<CheckUserCredentialsCommand, Result<UserId>>(
  //     new CheckUserCredentialsCommand(loginDto),
  //   );
  // }

  // private async getUserViewById(id: string): Promise<Result<ResponseUserDto>> {
  //   return this.userQueryRepo.getUserView(id);
  // }

  private async findUserProviderByProviderId(
    providerUserId: string,
    provider: Provider,
  ) {
    return this.userRepo.findUserProviderByProviderId(providerUserId, provider);
  }

  private async updateAccountByProviderId(
    params: UpdateUserProviderByProviderIdParams,
    data: UpdateUserProviderByProviderIdData,
  ) {
    return this.userRepo.updateAccountByProviderId(params, data);
  }

  private async linkAccountToExistingUser(
    provider: Provider,
    userData: AccountResponse,
  ): Promise<Result<string>> {
    return this.commandBus.execute<
      LinkAccountToExistingUserCommand,
      Result<string>
    >(new LinkAccountToExistingUserCommand(provider, userData));
  }

  private async findUserById(userId: string) {
    return this.userRepo.findUserById(userId);
  }
}
