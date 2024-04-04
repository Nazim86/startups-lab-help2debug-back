import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { LoginProviderDto } from './dto/loginProvider.dto';
import { GitHubLoginCommand } from './application/use-cases/githubLogin.usecase';
import { Result } from '../../core/result';
import { CreateTokensType } from '../device/types/createTokens.type';

@Injectable()
export class AuthService {
  constructor(private readonly commandBus: CommandBus) {}

  async githubLogin(
    providerDto: LoginProviderDto,
  ): Promise<Result<CreateTokensType>> {
    return this.commandBus.execute<
      GitHubLoginCommand,
      Result<CreateTokensType>
    >(new GitHubLoginCommand(providerDto));
  }
}
