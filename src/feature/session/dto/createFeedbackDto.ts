import { ApiProperty } from '@nestjs/swagger';
import { Entity } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class CreateFeedbackDto {
  @ApiProperty({
    description: 'Feedback for session',
    type: 'string',
    example: 'I am satisfied with this session',
  })
  @IsString()
  @IsNotEmpty()
  feedback: string;
}
