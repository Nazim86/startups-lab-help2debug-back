import { Module } from '@nestjs/common';
import { JwtConfig } from './jwt.config';
import { JwtAdapter } from './jwt.adapter';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  providers: [JwtConfig, JwtAdapter],
  exports: [JwtAdapter, JwtConfig],
})
export class JWTModule {}
