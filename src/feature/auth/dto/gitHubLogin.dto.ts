import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GitHubLoginDto {
  @ApiProperty({
    description: 'GitHub login code',
    type: 'string',
    example: '',
  })
  @IsNotEmpty()
  code: string;
}
