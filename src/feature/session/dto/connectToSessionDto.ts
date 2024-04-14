import { Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class ConnectToSessionDto {
  @ApiProperty({
    description: 'User Id',
    type: 'string',
    example: uuidv4(),
  })
  userId: string;

  @ApiProperty({
    description: 'Session Id',
    type: 'string',
    example: uuidv4(),
  })
  sessionId: string;

  @ApiProperty({
    description: 'Code',
    type: 'string',
    example: uuidv4(),
  })
  code: string;
}
