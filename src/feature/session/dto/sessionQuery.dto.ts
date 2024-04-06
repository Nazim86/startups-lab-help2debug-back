import { IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SessionStatus } from '../types/sessionStatus.enum';

export class SessionQueryDto {
  @IsOptional()
  @ApiProperty({ description: 'Search session by status', required: false })
  searchStatus?: SessionStatus;

  @IsOptional()
  @ApiProperty({ description: 'Cursor id', required: false, isArray: true })
  cursor?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  @ApiProperty({
    description: 'Sorting direction',
    default: 'desc',
    required: false,
  })
  sortDirection?: string = 'desc';

  @IsOptional()
  // @IsIn(['score', 'updatedAt', 'authorId'])
  @ApiProperty({
    description: 'Sorting item',
    default: 'score',
    required: false,
  })
  sortField?: string = 'createdAt';

  @IsOptional()
  @ApiProperty({
    description: 'Number of items to skip',
    default: 0,
    required: false,
  })
  skip?: number = 0;

  @IsOptional()
  @ApiProperty({
    description: 'Number of items to take',
    default: 10,
    required: false,
  })
  take?: number = 10;
}
