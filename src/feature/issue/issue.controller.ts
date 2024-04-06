import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateIssueDto } from './dto/createIssue.dto';
import { CreateIssueSwaggerDecorator } from '../../core/swagger/issue/createIssue.swagger.decorator';
import { UpdateIssueSwaggerDecorator } from '../../core/swagger/issue/updateIssue.swagger.decorator';
import { IssueResponseDto } from './responses';
import { GetIssueSwaggerDecorator } from '../../core/swagger/issue/getIssue.swagger.decorator';

@ApiTags('Issues')
@Controller('issue')
export class IssueController {
  constructor() {}

  @ApiOperation({
    summary: 'Create a new issue',
    description:
      'Пользователь может создать Запрос, который он хочет удовлетворить: {type, title, description, hashtags }',
  })
  @CreateIssueSwaggerDecorator()
  @Post()
  create(@Body() createIssueDto: CreateIssueDto): string {
    return 'create issue';
  }

  @ApiOperation({
    summary: 'Update issue',
    description:
      'Пользователь может обновить Запрос, которые он хочет удовлетворить: {type, title, description, hashtags }',
  })
  @UpdateIssueSwaggerDecorator()
  @Put(':id')
  update(@Body() updateIssueDto: CreateIssueDto): string {
    return 'update the issue';
  }

  @ApiOperation({
    summary: 'Вернуть все запросы для конкретного юзера (+по токену)',
    description: '',
  })
  @GetIssueSwaggerDecorator()
  @Get(':userId')
  getForUser(@Param('userId') userId: string): string {
    // server redirect to ZOOM/GoogleMeet
    return 'get all issues of user';
  }
}
