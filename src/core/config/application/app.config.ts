import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfig {
  constructor(protected configService: ConfigService) {}

  getAppUrl(): string {
    return (
      this.configService.get<string>('APP_URL') ??
      `http://127.0.0.1:${this.getPort()}`
    );
  }

  getPort(): number {
    return this.configService.get<number>('PORT', 3000);
  }
}
