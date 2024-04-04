import { ApiProperty } from '@nestjs/swagger';

export class ResponseAccessTokenDto {
  @ApiProperty()
  accessToken: string;

  constructor(token: string) {
    this.accessToken = token;
  }
}
