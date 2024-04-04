import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GitHubOauth2Config {
  constructor(private readonly configService: ConfigService) {}

  getSettings() {
    return {
      rootURl: 'https://github.com/login/oauth/access_token',
      userInfoURL: 'https://api.github.com/user',
      userEmailsInfo: 'https://api.github.com/user/emails',
      clientId: this.configService.get<string>('GITHUB_OAUTH_CLIENT_ID'),
      clientSecret: this.configService.get<string>(
        'GITHUB_OAUTH_CLIENT_SECRET',
      ),
      redirectUri: this.configService.get<string>('GITHUB_OAUTH_REDIRECT'),
      grantType: 'authorization_code',
    };
  }
}
