import { Controller, Get, Query, Ip, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../auth.service';
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GitHubLoginDto } from '../dto';
import { UserAgent } from '../../../core/decorators/userAgent.decorator';
import { LoginProviderDto } from '../dto';
import { ResponseAccessTokenDto } from '../../device/responses';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ type: ResponseAccessTokenDto })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @Get('github')
  @ApiOperation({
    summary: 'Oauth2 github authorization',
  })
  @Get('github')
  async githubLogin(
    @Query() { code }: GitHubLoginDto,
    @Ip() ip: string,
    @UserAgent() title: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<ResponseAccessTokenDto> {
    const providerDto: LoginProviderDto = {
      code,
      ip,
      title,
    };

    const result = await this.authService.githubLogin(providerDto);

    if (!result.isSuccess) {
      throw result.err;
    }

    const { accessToken, refreshToken } = result.value;

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
    });

    return new ResponseAccessTokenDto(accessToken);
  }
}
