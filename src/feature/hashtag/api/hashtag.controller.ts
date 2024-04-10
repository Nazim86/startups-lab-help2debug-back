import { Controller, Get, Query } from '@nestjs/common';
import { HashtagService } from '../hashtag.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseHashtagDto } from '../responses';
import { HashtagQueryDto } from '../dto/hashtagQuery.dto';

@ApiTags('Hashtag')
@Controller('hashtag')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}

  @ApiOperation({
    summary: 'Получить все теги (топ 10)',
    description: 'по term',
  })
  @ApiOkResponse({ type: ResponseHashtagDto, isArray: true })
  @Get()
  getTagsForSuggestion(@Query() query: HashtagQueryDto) {
    return this.hashtagService.findAll();
  }
}
