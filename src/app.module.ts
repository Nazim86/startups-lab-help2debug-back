import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import process from 'process';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './feature/auth/auth.module';
import { UserModule } from './feature/user/user.module';
import { HashtagModule } from './feature/hashtag/hashtag.module';
import { DeviceModule } from './feature/device/device.module';
import { JWTModule } from './core/jwt-adapter/jwt.module';
import { CqrsModule } from '@nestjs/cqrs';
import { AppConfig } from './core/config/application';
import { MentorSettingModule } from './feature/mentor-setting/mentor-setting.module';
import { IssueModule } from './feature/issue/issue.module';
import { SessionModule } from './feature/session/session.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

export const configModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: process.env.NODE_ENV === 'development' ? '.env' : 'prod.env',
});

const entities = [];

export const neonConfigForTypeOrm: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.PG_HOST,
  username: process.env.PG_USER,
  password: process.env.PG_PASS,
  entities,
  ssl: true,
  database: process.env.PG_DATABASE,
  autoLoadEntities: true,
  synchronize: false,
};

export const localConfigTypeOrm: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'sa',
  entities,
  database: 'help2debug',
  autoLoadEntities: true,
  synchronize: true,
};
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger-static'),
      serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/swagger',
    }),
    TypeOrmModule.forRoot(neonConfigForTypeOrm),
    //TypeOrmModule.forFeature(entities),
    configModule,
    CqrsModule,
    UserModule,
    HashtagModule,
    AuthModule,
    DeviceModule,
    JWTModule,
    MentorSettingModule,
    IssueModule,
    SessionModule,
  ],
  providers: [AppConfig],
})
export class AppModule {}
