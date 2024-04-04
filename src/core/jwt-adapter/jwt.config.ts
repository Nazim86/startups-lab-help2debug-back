import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtConfig {
  private readonly _accessJwtSecret: string;
  private readonly _refreshJwtSecret: string;

  constructor(private readonly configService: ConfigService) {
    this._accessJwtSecret = configService.get<string>('ACCESS_JWT_SECRET');
    this._refreshJwtSecret = configService.get<string>('REFRESH_JWT_SECRET');
  }

  get refreshJwtSecret() {
    return this._refreshJwtSecret;
  }

  get accessJwtSecret() {
    return this._accessJwtSecret;
  }
}
