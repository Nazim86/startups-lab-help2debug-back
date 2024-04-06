import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { HelpType } from '../../mentor-setting/types/helpType.enum';

export class IssueResponseDto {
  @ApiProperty({
    description: 'issue ID',
    type: 'string',
    example: uuidv4(),
  })
  id: string;

  @ApiProperty({
    description: 'Assistance type',
    type: 'enum',
    enum: HelpType,
  })
  type: HelpType;

  @ApiProperty({
    description: 'Title of the issue',
    type: 'string',
    example: 'junior react developer mock-interview',
  })
  title: string;

  @ApiProperty({
    description: 'Description of the issue',
    type: 'string',
    example:
      'I need help for interview preparation, I need react redux and mobx',
  })
  description: string;
}
