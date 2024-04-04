import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../db';
import { ProviderUserResponse } from '../../../auth/response';
import { User } from '../../entities/user.entity';
import { Account } from '../../entities/account.entity';
import { Provider } from '../../entities/account.enum';
import { Result } from '../../../../core/result';

export class LinkProviderUserToExistingUserCommand {
  constructor(
    public provider: Provider,
    public userData: ProviderUserResponse,
  ) {}
}

@CommandHandler(LinkProviderUserToExistingUserCommand)
export class LinkProviderUserToExistingUserUseCase
  implements ICommandHandler<LinkProviderUserToExistingUserCommand>
{
  constructor(private readonly userRepo: UserRepository) {}

  async execute({
    provider,
    userData,
  }: LinkProviderUserToExistingUserCommand): Promise<Result<string>> {
    let userByEmail = await this.userRepo.findByUsernameOrEmail(userData.email);

    if (!userByEmail) {
      userByEmail = await this.userRepo.findByUsernameOrEmail(
        userData.username,
      );
    }

    let userId: string;
    if (!userByEmail) {
      const createdUser = await this.createUserWithProviderUser(
        provider,
        userData,
      );
      userId = createdUser.id;
    } else {
      await this.linkProviderUserToExistingUser(
        userByEmail,
        provider,
        userData,
      );
      userId = userByEmail.id;
    }

    return Result.Ok<string>(userId);
  }

  private async createUserWithProviderUser(
    provider: Provider,
    userData: ProviderUserResponse,
  ) {
    const numberClientUsers = await this.userRepo.numberClientUsers();
    const username = `client${numberClientUsers + 1}`;

    //TODO: need transaction here

    const user = new User();
    user.username = username;
    user.email = userData.email;
    const newUser = await this.userRepo.saveUser(user);

    // Create Provider
    const account = new Account();
    account.provider = provider;
    account.username = userData.username;
    account.email = userData.email;
    account.user = newUser;
    await this.userRepo.saveAccount(account);

    return user;
  }

  private async linkProviderUserToExistingUser(
    user: User,
    provider: Provider,
    userData: ProviderUserResponse,
  ) {
    const account = new Account();
    account.provider = provider;
    account.username = userData.username;
    account.email = userData.email;
    account.user = user;

    await this.userRepo.saveAccount(account);
  }
}
