import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../db';
import { AccountResponse } from '../../../auth/response';
import { User } from '../../entities/user.entity';
import { Account } from '../../entities/account.entity';
import { Provider } from '../../entities/account.enum';
import { Result } from '../../../../core/result';

export class LinkAccountToExistingUserCommand {
  constructor(
    public provider: Provider,
    public userData: AccountResponse,
  ) {}
}

@CommandHandler(LinkAccountToExistingUserCommand)
export class LinkAccountToExistingUserUseCase
  implements ICommandHandler<LinkAccountToExistingUserCommand>
{
  constructor(private readonly userRepo: UserRepository) {}

  async execute({
    provider,
    userData,
  }: LinkAccountToExistingUserCommand): Promise<Result<string>> {
    let userByEmail = await this.userRepo.findByUsernameOrEmail(userData.email);

    if (!userByEmail) {
      userByEmail = await this.userRepo.findByUsernameOrEmail(
        userData.username,
      );
    }

    let userId: string;
    if (!userByEmail) {
      const createdUser = await this.createUserWithAccount(provider, userData);
      userId = createdUser.id;
    } else {
      await this.linkAccountToExistingUser(userByEmail, provider, userData);
      userId = userByEmail.id;
    }

    return Result.Ok<string>(userId);
  }

  private async createUserWithAccount(
    provider: Provider,
    userData: AccountResponse,
  ) {
    const username = userData.username;
    const email = userData.email;

    // const numberClientUsers = await this.userRepo.numberClientUsers();
    // //const username = `client${numberClientUsers + 1}`;

    //TODO: need transaction here

    const user = new User();
    user.username = username;
    user.email = email;
    const newUser = await this.userRepo.saveUser(user);

    // Create Account
    const account = new Account();
    account.provider = provider;
    account.username = username;
    account.email = email;
    account.user = newUser;
    await this.userRepo.saveAccount(account);

    return user;
  }

  private async linkAccountToExistingUser(
    user: User,
    provider: Provider,
    userData: AccountResponse,
  ) {
    const account = new Account();
    account.provider = provider;
    account.username = userData.username;
    account.email = userData.email;
    account.user = user;

    await this.userRepo.saveAccount(account);
  }
}
