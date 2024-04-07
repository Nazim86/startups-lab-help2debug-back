import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { HelpType } from '../../mentor-setting/types/helpType.enum';

export class CreateIssueDto {
  @ApiProperty({
    description: 'Assistance type',
    type: 'enum',
    enum: HelpType,
    //example: HelpType,
  })
  @IsEnum(HelpType)
  @IsNotEmpty()
  type: HelpType;

  @ApiProperty({
    description: 'Title of the issue',
    type: 'string',
    example: 'junior react developer mock-interview',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Description of the issue',
    type: 'string',
    example:
      'I need help for interview preparation, I need react redux and mobx',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Hashtags for technologies',
    type: 'string',
    example: ['react', 'redux', 'mobx'],
  })
  @IsString()
  @IsNotEmpty()
  hashtags: string[];
}
