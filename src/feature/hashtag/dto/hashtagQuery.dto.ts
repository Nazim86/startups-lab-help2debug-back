import { IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class HashtagQueryDto {
  @IsOptional()
  @ApiProperty({ description: 'Search tag by title', required: false })
  searchTitleTerm?: string = 'desc';

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
