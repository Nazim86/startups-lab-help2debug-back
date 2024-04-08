import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHashtagDto {
  @ApiProperty({
    description: 'Hashtag title',
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Hashtag normalized',
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  normalized: string;
}
