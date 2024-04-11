import { Hashtag } from '../../entities/hashtag.entity';
import { HashtagRepository } from '../../db/hashtag.repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Result } from '../../../../core/result';
import { CreateHashtagDto } from '../../dto/createHashtag.dto';
import { CustomError } from '../../../../core/config/exceptions';

export class CreateHashtagCommand {
  constructor(public readonly hashtagTitles: string[]) {}
}

@CommandHandler(CreateHashtagCommand)
export class CreateHashtagUseCase
  implements ICommandHandler<CreateHashtagCommand>
{
  constructor(private readonly hashtagRepo: HashtagRepository) {}

  async execute({
    hashtagTitles,
  }: CreateHashtagCommand): Promise<Result<Hashtag[]>> {
    const mappedHashtagsDto = hashtagTitles.map((hashtag) => {
      return {
        title: hashtag,
        normalized: hashtag.toLowerCase().replace(/\s+/g, ''),
      };
    });

    const normalizedHashtags = mappedHashtagsDto.map(
      (hashtagObj) => hashtagObj.normalized,
    );

    const foundHashtags: Hashtag[] =
      await this.hashtagRepo.findHashtags(normalizedHashtags);

    let hashtags: Hashtag[];

    //TODO: cover with transaction

    if (
      foundHashtags.length &&
      foundHashtags.length !== normalizedHashtags.length
    ) {
      const existingNormalizedHashtags = foundHashtags.map(
        (hashtag) => hashtag.normalized,
      );

      const missingNormalizedHashtags = normalizedHashtags.filter(
        (normalizedHashtag) =>
          !existingNormalizedHashtags.includes(normalizedHashtag),
      );

      const missingHashtagDto = mappedHashtagsDto.filter((hashtagDto) =>
        missingNormalizedHashtags.includes(hashtagDto.normalized),
      );

      hashtags = this.createHashtags(missingHashtagDto);
    }

    if (!foundHashtags.length) {
      hashtags = this.createHashtags(mappedHashtagsDto);
    }

    hashtags = await this.hashtagRepo.save(hashtags);

    if (!hashtags) {
      return Result.Err(new CustomError('Something went wrong'));
    }

    //joining found and missed hashtags
    foundHashtags.push(...hashtags);

    return Result.Ok(foundHashtags);
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
