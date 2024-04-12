import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

export class HashtagResponseDto {
  @ApiProperty({
    description: 'issue ID',
    type: 'string',
    example: uuidv4(),
  })
  id: string;

  @ApiProperty({
    description: 'Title hashtags',
    type: 'string',
    example: ['react', 'nest js', 'typeorm'],
  })
  title: string;

  @ApiProperty({
    description: 'Normalized hashtags',
    type: 'string',
    example: ['react', 'nestjs', 'typeorm'],
  })
  normalized: string;
}
