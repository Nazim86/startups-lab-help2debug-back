import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Session } from '../../entities/session.entity';
import { Result } from 'src/core/result';
import { SessionStatus } from '../../types/sessionStatus.enum';
import { SessionRepository } from '../../db/session.repository';
import {
  CustomError,
  ForbiddenError,
  NotFoundError,
} from '../../../../core/config/exceptions';
import {
  ACTIVE_SESSION_NOT_FOUND,
  SESSION_FORBIDDEN,
  SESSION_NOT_FOUND,
} from '../../session.constant';
import { IssueRepository } from '../../../issue/db/issue.repository';
import { ConnectToSessionDto } from '../../dto/connectToSessionDto';
import { MentorSettingRepository } from '../../../mentor-setting/db/mentorSetting.repository';

export class ConnecToSessionCommand {
  constructor(public connectToSessionDto: ConnectToSessionDto) {}
}

@CommandHandler(ConnecToSessionCommand)
export class ConnectToSessionUseCase
  implements ICommandHandler<ConnecToSessionCommand>
{
  constructor(
    private readonly sessionRepo: SessionRepository,
    private readonly issueRepo: IssueRepository,
    private readonly mentorSettingRepo: MentorSettingRepository,
  ) {}

  async execute({
    connectToSessionDto,
  }: ConnecToSessionCommand): Promise<Result<string>> {
    const session: Session | null = await this.sessionRepo.findSessionById(
      connectToSessionDto.sessionId,
    );

    if (!session) {
      return Result.Err(new NotFoundError(SESSION_NOT_FOUND));
    }

    if (session && session.status !== SessionStatus.In_Progress) {
      return Result.Err(new NotFoundError(ACTIVE_SESSION_NOT_FOUND));
    }

    const issue = await this.issueRepo.getIssueById(session.issueId);

    if (
      session.code !== connectToSessionDto.code ||
      issue.user.id !== connectToSessionDto.userId
    ) {
      return Result.Err(new ForbiddenError(SESSION_FORBIDDEN));
    }

    session.status = SessionStatus.In_Progress;
    session.statusUpdateAt = new Date();

    const updatedResult = await this.sessionRepo.save(session);

    if (!updatedResult) {
      return Result.Err(new NotFoundError(SESSION_NOT_FOUND));
    }

    const mentorSetting = await this.mentorSettingRepo.findSettingByUserId(
      session.mentorId,
    );

    return Result.Ok(mentorSetting.videoConferenceLink);
  }
}
