import { CreateIssueDto } from '../../dto/createIssue.dto';
import { UserFacade } from '../../../user/user.facade';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { HashtagFacade } from '../../../hashtag/hashtag.facade';
import { Hashtag } from '../../../hashtag/entities/hashtag.entity';
import { IssueRepository } from '../../db/issue.repository';
import { Result } from '../../../../core/result';
import { Issue } from '../../entities/issue.entity';
import { CreateHashtagDto } from '../../../hashtag/dto/createHashtag.dto';

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

    let hashtags: Hashtag[];

    //TODO: cover with transaction

    //TODO: DO I need update (push new) hashtag title if existing hashtag title does not match with user entered? If yes
    // then I need to check each title oneByOne and push the ones does not exist

    if (
      foundHashtags.length &&
      foundHashtags.length !== normalizedHashtags.length
    ) {
      const existingNormalizedHashtags = foundHashtags.map(
        (hashtag) => hashtag.normalized,
      );
      //console.log('existingNormalizedHashtags', existingNormalizedHashtags);

      const missingNormalizedHashtags = normalizedHashtags.filter(
        (normalizedHashtag) =>
          !existingNormalizedHashtags.includes(normalizedHashtag),
      );

      // console.log('missingNormalizedHashtags', missingNormalizedHashtags);

      const missingHashtagDto = mappedHashtagsDto.filter((hashtagDto) =>
        missingNormalizedHashtags.includes(hashtagDto.normalized),
      );

      hashtags = this.createHashtags(missingHashtagDto);
    }

    if (!foundHashtags.length) {
      hashtags = this.createHashtags(mappedHashtagsDto);
    }

    hashtags = await this.hashtagFacade.repository.saveHashtags(hashtags);

    //joining found and missed hashtags
    foundHashtags.push(...hashtags);

    const newIssue = new Issue();
    newIssue.type = createIssueDto.type;
    newIssue.title = createIssueDto.title;
    newIssue.description = createIssueDto.description;
    newIssue.user = user;
    newIssue.hashtag = foundHashtags;

    const created = await this.issueRepo.saveIssue(newIssue);
    return Result.Ok(created);
  }
  private createHashtags(createHashtagDto: CreateHashtagDto[]) {
    // Remove duplicates. If user entered same tag at least twice
    const uniqueHashtags = createHashtagDto.filter((obj, index, array) => {
      return (
        index === array.findIndex((item) => item.normalized === obj.normalized)
      );
    });

    return uniqueHashtags.map((hashtagDto) => {
      const hashtag = new Hashtag();
      hashtag.normalized = hashtagDto.normalized;
      hashtag.title = hashtagDto.title;
      return hashtag;
    });
  }
}
