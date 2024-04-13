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
import { UpdateIssueCommand } from '../application/use-cases/updateIssue.usecase';
import { IssueQueryRepository } from '../db/issue.query.repository';

@ApiTags('Issues')
@UseGuards(AccessTokenGuard)
@Controller('issue')
export class IssueController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly issueQueryRepo: IssueQueryRepository,
  ) {}

  @ApiOperation({
    summary: 'Create a new issue',
    description:
      'Пользователь может создать Запрос, который он хочет удовлетворить: {type, title, description, hashtags }',
  })
  @CreateIssueSwaggerDecorator()
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

    return resultCreated.value;
  }

  @ApiOperation({
    summary: 'Update issue',
    description:
      'Пользователь может обновить Запрос, которые он хочет удовлетворить: {type, title, description, hashtags }',
  })
  @UpdateIssueSwaggerDecorator()
  @Put(':id')
  async update(
    @CurrentUserId() userId: string,
    @Param('id') issueId: string,
    @Body() updateIssueDto: CreateIssueDto,
  ) {
    const updateResult = await this.commandBus.execute(
      new UpdateIssueCommand(updateIssueDto, userId, issueId),
    );

    if (!updateResult.isSuccess) {
      throw updateResult.err;
    }
    return updateResult.value;
  }

  @ApiOperation({
    summary: 'Вернуть все запросы для конкретного юзера (+по токену)',
    description: '',
  })
  @GetIssueSwaggerDecorator()
  @Get()
  async getForUser(@CurrentUserId() userId: string) {
    const issues = await this.issueQueryRepo.getIssuesForUser(userId);

    // server redirect to ZOOM/GoogleMeet //TODO: Is this mistake?
    return issues;
  }
}
