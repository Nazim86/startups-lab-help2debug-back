import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { JwtConfig } from './jwt.config';

@Injectable()
export class JwtAdapter {
  constructor(
    private jwtConfig: JwtConfig,
    private jwtService: JwtService,
  ) {}

  async createRefreshToken(userId: string, deviceId: string): Promise<string> {
    return this.jwtService.signAsync(
      {
        userId,
        deviceId,
      },
      {
        expiresIn: '2000 seconds',
        secret: this.jwtConfig.refreshJwtSecret,
      },
    );
  }

  async createAccessToken(userId: string): Promise<string> {
    return this.jwtService.signAsync(
      { userId },
      {
        expiresIn: '1000 seconds',
        secret: this.jwtConfig.accessJwtSecret,
      },
    );
  }

  decodeToken(token: string) {
    return this.jwtService.decode(token);
  }
}
