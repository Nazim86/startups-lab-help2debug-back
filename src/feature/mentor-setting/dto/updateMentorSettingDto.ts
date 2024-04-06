import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { HelpType } from '../types/helpType.enum';
import { LiveStatus } from '../types/liveStatus.enum';

export class UpdateMentorSettingDto {
  @ApiProperty({
    description: 'Help type',
    type: 'enum',
    enum: HelpType,
  })
  @IsString()
  @IsNotEmpty()
  helpType: HelpType;

  @ApiProperty({
    description: 'Video Conference Link',
    type: 'string',
    example: 'https://www.zoom.com/id',
  })
  @IsString()
  @IsNotEmpty()
  videoConferenceLink: string;

  @ApiProperty({
    description: 'Live Status',
    type: 'enum',
    enum: LiveStatus,
  })
  @IsString()
  @IsNotEmpty()
  liveStatus: LiveStatus;
}
