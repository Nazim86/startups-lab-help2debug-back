import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../db';
import { AccountResponse } from '../../../auth/response';
import { User } from '../../entities/user.entity';
import { Account } from '../../entities/account.entity';
import { Provider } from '../../enum/account.enum';
import { Result } from '../../../../core/result';
import { MentorSetting } from '../../../mentor-setting/entities/mentorSetting.entity';
import { LiveStatus } from '../../../mentor-setting/types/liveStatus.enum';
import { MentorSettingRepository } from '../../../mentor-setting/db/mentorSetting.repository';
import { HelpType } from '../../../mentor-setting/types/helpType.enum';

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
  constructor(
    private readonly userRepo: UserRepository,
    private readonly mentorSettingRepo: MentorSettingRepository,
  ) {}

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
    const newAccount = await this.userRepo.saveAccount(account);

    //TODO:create mentorSetting here or while updating mentorSetting
    const mentorSetting = new MentorSetting();
    mentorSetting.status = LiveStatus.INACTIVE;
    mentorSetting.helpType = HelpType.CONSULTING; //TODO: problem of creating mentor setting here is that what to pass as the first value here
    mentorSetting.user = newUser;
    mentorSetting.accountId = newAccount.id;

    await this.mentorSettingRepo.save(mentorSetting);

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
