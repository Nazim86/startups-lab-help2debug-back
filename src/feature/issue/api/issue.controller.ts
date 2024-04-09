import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateIssueDto } from '../dto/createIssue.dto';
import { CreateIssueSwaggerDecorator } from '../../../core/swagger/issue/createIssue.swagger.decorator';
import { UpdateIssueSwaggerDecorator } from '../../../core/swagger/issue/updateIssue.swagger.decorator';
import { GetIssueSwaggerDecorator } from '../../../core/swagger/issue/getIssue.swagger.decorator';
import { AccessTokenGuard } from '../../auth/guards/accessJwt.guard';
import { CommandBus } from '@nestjs/cqrs';
import { CreateIssueCommand } from '../application/use-cases';
import { CurrentUserId } from '../../../core/decorators/currentUserId.decorator';

@ApiTags('Issues')
@Controller('issue')
export class IssueController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({
    summary: 'Create a new issue',
    description:
      'Пользователь может создать Запрос, который он хочет удовлетворить: {type, title, description, hashtags }',
  })
  @CreateIssueSwaggerDecorator()
  @UseGuards(AccessTokenGuard)
  @Post()
  async create(
    @Body() createIssueDto: CreateIssueDto,
    @CurrentUserId() userId: string,
  ): Promise<string> {
    const resultCreated = await this.commandBus.execute(
      new CreateIssueCommand(createIssueDto, userId),
    );

    if (!resultCreated.isSuccess) {
      throw resultCreated.err;
    }

    return resultCreated;
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
