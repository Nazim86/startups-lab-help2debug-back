import { CreateIssueDto } from '../../dto/createIssue.dto';
import { UserFacade } from '../../../user/user.facade';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IssueRepository } from '../../db/issue.repository';
import { Result } from '../../../../core/result';
import { CreateHashtagCommand } from '../../../hashtag/application/use-case/createHashtag.usecase';
import {
  ForbiddenError,
  NotFoundError,
} from '../../../../core/config/exceptions';
import {
  ERROR_ISSUE_NOT_FOUND,
  ERROR_NOT_PERMITTED,
} from '../../issue.constants';

export class UpdateIssueCommand {
  constructor(
    public updateIssueDto: CreateIssueDto,
    public userId: string,
    public issueId: string,
  ) {}
}

@CommandHandler(UpdateIssueCommand)
export class UpdateIssueUseCase implements ICommandHandler<UpdateIssueCommand> {
  constructor(
    private readonly userFacade: UserFacade,
    private readonly commandBus: CommandBus,
    private readonly issueRepo: IssueRepository,
  ) {}

  async execute({
    updateIssueDto,
    userId,
    issueId,
  }: UpdateIssueCommand): Promise<Result> {
    const issue = await this.issueRepo.getIssueById(issueId);

    if (!issue) {
      return Result.Err(new NotFoundError(ERROR_ISSUE_NOT_FOUND));
    }

    if (issue.user.id !== userId) {
      return Result.Err(new ForbiddenError(ERROR_NOT_PERMITTED));
    }

    const createdHashtags = await this.commandBus.execute(
      new CreateHashtagCommand(updateIssueDto.hashtags),
    );

    if (!createdHashtags.isSuccess) {
      return Result.Err(createdHashtags.err);
    }

    issue.type = updateIssueDto.type;
    issue.title = updateIssueDto.title;
    issue.description = updateIssueDto.description;
    issue.hashtag = createdHashtags;

    //TODO: DO I need to get user entity and update hashtags there

    await this.issueRepo.saveIssue(issue);

    return Result.Ok();
  }
}
