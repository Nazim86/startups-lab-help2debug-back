import { CreateIssueDto } from '../../dto/createIssue.dto';
import { UserFacade } from '../../../user/user.facade';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateHashtagCommand } from '../../../hashtag/application/use-cases/createHashtag.usecase';
import { HashtagFacade } from '../../../hashtag/hashtag.facade';
import { Hashtag } from '../../../hashtag/entities/hashtag.entity';
import { IssueRepository } from '../../db/issue.repository';
import { Result } from '../../../../core/result';
import { Issue } from '../../entities/issue.entity';

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
    private readonly hashtagFacade: HashtagFacade,
    private readonly issueRepo: IssueRepository,
  ) {}

  async execute({ createIssueDto, userId }: CreateIssueCommand) {
    const user = await this.userFacade.repository.findUserById(userId);

    const mappedHashtagsDto = createIssueDto.hashtags.map((hashtag) => {
      return {
        title: hashtag,
        normalized: hashtag.toLowerCase().replace(/\s+/g, ''),
      };
    });

    const normalizedHashtags = mappedHashtagsDto.map(
      (hashtagObj) => hashtagObj.normalized,
    );

    const foundHashtags: Hashtag[] =
      await this.hashtagFacade.repository.findHashtags(normalizedHashtags);

    let hashtags: Hashtag[] = foundHashtags;

    //TODO: cover with transaction

    //TODO: DO I need update (push new) hashtag title if existing hashtag title does not match with user entered? If yes
    // then I need to check each title oneByOne and push the ones does not exist

    if (hashtags.length && hashtags.length !== normalizedHashtags.length) {
      const existingNormalizedHashtags = foundHashtags.map(
        (hashtag) => hashtag.normalized,
      );
      console.log('existingNormalizedHashtags', existingNormalizedHashtags);

      const missingNormalizedHashtags = normalizedHashtags.filter(
        (normalizedHashtag) =>
          !existingNormalizedHashtags.includes(normalizedHashtag),
      );

      console.log('missingNormalizedHashtags', missingNormalizedHashtags);

      const missingHashtagDto = mappedHashtagsDto.filter((hashtagDto) =>
        missingNormalizedHashtags.includes(hashtagDto.normalized),
      );

      const createdHashtags = await this.commandBus.execute(
        new CreateHashtagCommand(missingHashtagDto),
      );
      console.log('createdHashtags', hashtags);

      hashtags = createdHashtags.value;

      hashtags.push(...foundHashtags);

      console.log('hashtag after push', hashtags);
    }

    if (!hashtags.length) {
      hashtags = await this.commandBus.execute(
        new CreateHashtagCommand(mappedHashtagsDto),
      );
    }

    const newIssue = new Issue();
    newIssue.type = createIssueDto.type;
    newIssue.title = createIssueDto.title;
    newIssue.description = createIssueDto.description;
    newIssue.user = user;
    newIssue.hashtag = hashtags;

    const created = await this.issueRepo.saveIssue(newIssue);
    return Result.Ok(created);
  }
}
