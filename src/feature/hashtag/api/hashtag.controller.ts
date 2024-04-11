import { Controller, Get, Query } from '@nestjs/common';
import { HashtagService } from '../hashtag.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { HashtagQueryDto } from '../dto/hashtagQuery.dto';
import { Hashtag } from '../entities/hashtag.entity';
import { PageDto } from '../../../core/dtos';
import { ApiPaginatedResponse } from '../../../core/swagger/pagination';
import { CreateHashtagDto } from '../dto/createHashtag.dto';

@ApiTags('Hashtag')
@Controller('hashtag')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}

  @ApiOperation({
    summary: 'Получить все теги (топ 10)',
    description: 'по term',
  })
  //@ApiOkResponse({ type: ResponseHashtagDto, isArray: true })
  @ApiPaginatedResponse(CreateHashtagDto)
  @Get()
  getTagsForSuggestion(
    @Query() pageOptionsDto: HashtagQueryDto,
  ): Promise<PageDto<Hashtag>> {
    return this.hashtagService.findAll(pageOptionsDto);
  }
}
