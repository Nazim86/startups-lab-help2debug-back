import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { SessionStatus } from '../types/sessionStatus.enum';
import { StatusByParticipant } from '../types/statusByParticipant.enum';
import { IssueResponseDto } from '../../issue/responses';
import { CreateHashtagDto } from '../../hashtag/dto/createHashtag.dto';

export class AllSessionResponseDto {
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
    description: 'Session status',
    type: 'enum',
    enum: SessionStatus,
  })
  status: SessionStatus;

  @ApiProperty({
    description: 'Status updated date',
    type: 'date',
    example: new Date(),
  })
  statusUpdateAt: Date;

  @ApiProperty({
    description: 'Status by Mentor',
    type: StatusByParticipant,
    enum: StatusByParticipant,
    required: false,
  })
  statusByMentor: StatusByParticipant;

  @ApiProperty({
    description: 'Status by Mentee',
    type: StatusByParticipant,
    enum: StatusByParticipant,
    required: false,
  })
  statusByMentee: StatusByParticipant;

  @ApiProperty({
    description: 'Issue',
    type: IssueResponseDto,
    example: IssueResponseDto,
    required: false,
  })
  issue: IssueResponseDto;

  @ApiProperty({
    description: 'Hashtag',
    type: CreateHashtagDto,
    example: CreateHashtagDto,
    required: false,
  })
  hashtag: CreateHashtagDto;
}
