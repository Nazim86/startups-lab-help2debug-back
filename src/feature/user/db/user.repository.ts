import { Injectable } from '@nestjs/common';

import {
  UpdateUserProviderByProviderIdData,
  UpdateUserProviderByProviderIdParams,
} from '../types';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Account } from '../entities/account.entity';
import { User } from '../entities/user.entity';
import { Provider } from '../entities/account.enum';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
  ) {}

  async saveUser(user: User) {
    return this.userRepo.save(user);
  }

  async saveAccount(account: Account) {
    return this.accountRepo.save(account);
  }

  async findByUsernameOrEmail(usernameOrEmail: string) {
    return this.userRepo.findOne({
      where: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
  }

  async findUserProviderByProviderId(
    providerUserId: string,
    provider: Provider,
  ) {
    return this.accountRepo.findOne({
      where: { providerUserId, provider },
    });
  }

  async findUserById(userId: string) {
    return this.userRepo.findOne({ where: { id: userId } });
  }

  async updateAccountByProviderId(
    params: UpdateUserProviderByProviderIdParams,
    data: UpdateUserProviderByProviderIdData,
  ) {
    return this.accountRepo.update(
      {
        userId: params.userId,
        providerUserId: params.providerUserId,
        provider: params.provider,
      },
      { username: data.username, email: data.email },
    );
  }

  // async linkProviderUserToExistingUser(data: LinkProviderUserToExistingUser) {
  //   return this.prismaService.userProvider.create({
  //     data: {
  //       userId: data.userId,
  //       provider: data.provider,
  //       providerUserId: data.providerUserId,
  //       name: data.name,
  //       email: data.email,
  //     },
  //   });
  // }

  async numberClientUsers() {
    return this.userRepo.count({
      where: {
        username: ILike('client%'),
      },
    });
  }
}
