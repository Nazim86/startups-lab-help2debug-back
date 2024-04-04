import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginProviderDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  ip: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;
}
