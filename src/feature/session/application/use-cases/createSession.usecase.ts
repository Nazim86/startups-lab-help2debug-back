import { CreateSessionDto } from '../../dto/createSessionDto';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Session } from '../../entities/session.entity';
import { Result } from 'src/core/result';
import { SessionStatus } from '../../types/sessionStatus.enum';
import { v4 as uuidv4 } from 'uuid';
import { SessionRepository } from '../../db/session.repository';

export class CreateSessionCommand {
  constructor(
    public createSessionDto: CreateSessionDto,
    public userId: string,
  ) {}
}

@CommandHandler(CreateSessionCommand)
export class CreateSessionUseCase
  implements ICommandHandler<CreateSessionCommand>
{
  constructor(private readonly sessionRepo: SessionRepository) {}

  async execute({
    createSessionDto,
    userId,
  }: CreateSessionCommand): Promise<Result<string>> {
    const existingSession: Session | null =
      await this.sessionRepo.findSessionByIssueId(createSessionDto.issueId);

    //if user again clicked creat session while it is already created
    if (
      existingSession &&
      (existingSession.status === SessionStatus.In_Progress ||
        existingSession.status === SessionStatus.Created)
    ) {
      return Result.Ok(existingSession.id); //TODO: or send error saying already created
    }
    const newSession = new Session();
    newSession.issueId = createSessionDto.issueId;
    newSession.status = SessionStatus.Created;
    newSession.code = uuidv4();
    newSession.mentorId = userId;

    const session: Session = await this.sessionRepo.save(newSession);

    return Result.Ok(session.id);
  }
}
