import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './api/auth.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { GitHubOauth2Config } from '../device/config';
import { AUTH_USE_CASES } from './application/use-cases';
import { UserModule } from '../user/user.module';
import { DeviceModule } from '../device/device.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [CqrsModule, UserModule, DeviceModule, HttpModule],
  controllers: [AuthController],
  providers: [AuthService, GitHubOauth2Config, ...AUTH_USE_CASES],
})
export class AuthModule {}
