import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

export class CreateSessionResponseDto {
  @ApiProperty({
    description: 'session Id',
    type: 'string',
    example: uuidv4(),
  })
  id: string;

  @ApiProperty({
    description: 'Issue Id',
    type: 'string',
    example: uuidv4(),
  })
  issueId: string;

  @ApiProperty({
    description: 'code',
    type: 'string',
    example: uuidv4(),
  })
  code: string;
}
