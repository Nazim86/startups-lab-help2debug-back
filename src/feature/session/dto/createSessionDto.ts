import { Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class CreateSessionDto {
  @ApiProperty({
    description: 'Issue Id',
    type: 'string',
    example: uuidv4(),
  })
  @IsString()
  @IsNotEmpty()
  issueId: string;
}
