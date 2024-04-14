import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Entity } from 'typeorm';
import { CreateSessionDto } from './dto/createSessionDto';
import { CreateSessionResponseDto } from './responses';
import { BAD_REQUEST } from '../../core/swagger/swagger.constants';
import { BadRequestResponse } from '../../core/responses';
import { ConnectSessionSwaggerDecorator } from '../../core/swagger/session/connectSession.swagger.decorator';
import { GetAllSessionSwaggerDecorator } from '../../core/swagger/session/getAllSession.swagger.decorator';
import { CreateSessionSwaggerDecorator } from '../../core/swagger/session/createSession.swagger.decorator';
import { SessionQueryDto } from './dto/sessionQuery.dto';
import { GetMySessionsSwaggerDecorator } from '../../core/swagger/session/getMySessions.swagger.decorator';
import { CreateFeedbackDto } from './dto/createFeedbackDto';
import { Result } from '../../core/result';
import { Session } from './entities/session.entity';
import { CommandBus } from '@nestjs/cqrs';
import { CreateSessionCommand } from './application/use-cases/createSession.usecase';
import { AccessTokenGuard } from '../auth/guards/accessJwt.guard';
import { CurrentUserId } from '../../core/decorators/currentUserId.decorator';
import { SessionQueryRepository } from './db/session.query.repository';
import { ConnectToSessionDto } from './dto/connectToSessionDto';
import { ConnecToSessionCommand } from './application/use-cases/connectToSession.usecase';

@ApiTags('Sessions')
@Controller('session')
@UseGuards(AccessTokenGuard)
export class SessionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly sessionQueryRepo: SessionQueryRepository,
  ) {}

  @ApiOperation({
    summary: 'создать сессию',
    description:
      'ментор нажимая кнопку Стартануть Сессию отправляет запрос сюда, сессия создаётся и ментор ждёт студента',
  })
  @CreateSessionSwaggerDecorator()
  @Post()
  async create(
    @CurrentUserId() userId: string,
    @Body() createSessionDto: CreateSessionDto,
  ): Promise<CreateSessionResponseDto> {
    const session: Result<Session> = await this.commandBus.execute(
      new CreateSessionCommand(createSessionDto, userId),
    );

    if (!session.isSuccess) {
      throw session.err;
    }

    const sessionView: Result<CreateSessionResponseDto> =
      await this.sessionQueryRepo.getSessionViewById(session.value.id);

    if (!sessionView.isSuccess) {
      throw sessionView.err;
    }

    return sessionView.value;
  }

  @ApiOperation({
    summary: 'Редирект на зумгуглмит',
    description:
      'студент переходит на промежуточный ендпоинт, котоырй переводит сессию в inprogress и редиректит в нужный видеочат',
  })
  @ConnectSessionSwaggerDecorator()
  @Get(':id/:code')
  async connectToSession(
    @CurrentUserId() userId: string,
    @Param('id') sessionId: string,
    @Param('code') code: string,
  ) {
    const connectToSessionDto: ConnectToSessionDto = {
      userId,
      sessionId,
      code,
    };
    const connectionResult = await this.commandBus.execute(
      new ConnecToSessionCommand(connectToSessionDto),
    );

    if (!connectionResult.isSuccess) {
      throw connectionResult.err;
    }

    // server redirect to ZOOM/GoogleMeet
    return connectionResult.value; //TODO: By redirecting means returning connection link?
  }

  @ApiOperation({
    summary: 'Все сессии всех пользователей',
    description:
      'с фильтрацией: те которые in-progress, или все... с бесконечной поркруткой (курсор)',
  })
  @GetAllSessionSwaggerDecorator()
  @Get()
  async allSessions(@Query() query: SessionQueryDto): Promise<string> {
    // server redirect to ZOOM/GoogleMeet
    return 'all sessions';
  }

  @ApiOperation({
    summary: 'Мои сессии',
    description:
      'с фильтрацией: где я ментор и где я менти, с бесконечной поркруткой (курсор) (валидация по токену)',
  })
  @GetMySessionsSwaggerDecorator()
  @Get('users/:userId')
  allSessionsForUser(
    @Param('userId') userId: string,
    @Query() query: SessionQueryDto,
  ): string {
    // server redirect to ZOOM/GoogleMeet
    return 'user sessions';
  }

  @ApiOperation({
    summary: 'ментор оставляет фидбек о сессии',
    description:
      'по сессия id, отправляя либо {status: Completed/Cancelled, messageForAdmin: string (* for Cancelled)}',
  })
  @GetMySessionsSwaggerDecorator()
  @Post('mentor/:id')
  postFeedbackByMentor(
    @Param('id') id: string,
    @Body() feedback: CreateFeedbackDto,
  ): string {
    // server redirect to ZOOM/GoogleMeet
    return 'feedback by mentor';
  }

  @ApiOperation({
    summary: 'ментор оставляет фидбек о сессии',
    description:
      'по сессия id, отправляя либо {status: Completed/Cancelled, messageForAdmin?: string (* for Cancelled), completedTags: [] (* for Completed status))}',
  })
  @GetMySessionsSwaggerDecorator()
  @Post('mentee/:id')
  postFeedbackByMentee(
    @Param('id') id: string,
    @Body() feedback: CreateFeedbackDto,
  ): string {
    // server redirect to ZOOM/GoogleMeet
    return 'feedback by mentee';
  }
}
