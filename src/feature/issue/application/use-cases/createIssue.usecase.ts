import { CreateIssueDto } from '../../dto/createIssue.dto';
import { UserFacade } from '../../../user/user.facade';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IssueRepository } from '../../db/issue.repository';
import { Result } from '../../../../core/result';
import { Issue } from '../../entities/issue.entity';
import { CreateHashtagCommand } from '../../../hashtag/application/use-case/createHashtag.usecase';

export class CreateIssueCommand {
  constructor(
    public createIssueDto: CreateIssueDto,
    public userId: string,
  ) {}
}

@CommandHandler(CreateIssueCommand)
export class CreateIssueUseCase implements ICommandHandler<CreateIssueCommand> {
  constructor(
    private readonly userFacade: UserFacade,
    private readonly commandBus: CommandBus,
    private readonly issueRepo: IssueRepository,
  ) {}

  async execute({
    createIssueDto,
    userId,
  }: CreateIssueCommand): Promise<Result<string>> {
    const user = await this.userFacade.repository.findUserById(userId);

    //TODO: Trancsaction

    const createdHashtags = await this.commandBus.execute(
      new CreateHashtagCommand(createIssueDto.hashtags),
    );

    if (!createdHashtags.isSuccess) {
      return Result.Err(createdHashtags.err);
    }

    const newIssue = new Issue();
    newIssue.type = createIssueDto.type;
    newIssue.title = createIssueDto.title;
    newIssue.description = createIssueDto.description;
    newIssue.user = user;
    newIssue.hashtag = createdHashtags.value;

    //TODO: DO I need to get user entity and update hashtags there

    const created = await this.issueRepo.saveIssue(newIssue);

    return Result.Ok(created.id);
  }
}
