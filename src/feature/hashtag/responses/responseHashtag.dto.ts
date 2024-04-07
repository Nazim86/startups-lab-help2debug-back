import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

export class ResponseHashtagDto {
  @ApiProperty({
    description: 'hashtag ID',
    type: 'string',
    example: uuidv4(),
  })
  id: string;

  @ApiProperty({ description: 'Normalized tag', type: 'string' })
  normalizedTag: string;
}
