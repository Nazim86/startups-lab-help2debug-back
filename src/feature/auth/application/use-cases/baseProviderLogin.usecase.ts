import { Result } from '../../../../core/result';
import { LoginProviderDto } from '../../dto';
import { AccountResponse } from '../../response';
import { CreateTokensType } from '../../../device/types/createTokens.type';
import { UserFacade } from '../../../user/user.facade';
import { Provider } from '../../../user/enum/account.enum';
import { DeviceFacade } from '../../../device/device.facade';

export abstract class BaseProvideLoginUseCase {
  abstract provider: Provider;

  protected constructor(
    private readonly userFacade: UserFacade,
    private readonly deviceFacade: DeviceFacade,
  ) {}

  abstract getProviderUser(code: string): Promise<Result<AccountResponse>>;

  async execute({
    providerDto,
  }: {
    providerDto: LoginProviderDto;
  }): Promise<Result<CreateTokensType>> {
    const resultProviderUser = await this.getProviderUser(providerDto.code);
    if (!resultProviderUser.isSuccess) {
      return Result.Err(resultProviderUser.err);
    }
    const userData = resultProviderUser.value;
    const userProvider =
      await this.userFacade.repository.findAccountByProviderId(
        userData.id,
        this.provider,
      );

    if (userProvider) {
      return this.updateAccountAndLoginUser(
        userData,
        userProvider.userId,
        providerDto,
      );
    }

    const resultLink = await this.userFacade.useCases.linkAccountToExistingUser(
      this.provider,
      userData,
    );

    if (!resultLink.isSuccess) {
      return Result.Err(resultLink.err);
    }

    return this.loginUser(resultLink.value, providerDto);
  }

  private async loginUser(userId: string, providerDto: LoginProviderDto) {
    return this.deviceFacade.useCases.createDevice({
      ip: providerDto.ip,
      title: providerDto.title,
      userId: userId,
    });
  }

  private async updateAccountAndLoginUser(
    userData: AccountResponse,
    userId: string,
    providerDto: LoginProviderDto,
  ) {
    await this.userFacade.repository.updateAccountByProviderId(
      { userId, providerUserId: userData.id, provider: this.provider },
      { username: userData.username, email: userData.email },
    );
    return this.loginUser(userId, providerDto);
  }
}
