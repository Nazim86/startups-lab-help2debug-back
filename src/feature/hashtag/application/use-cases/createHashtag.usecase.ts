import { Hashtag } from '../../entities/hashtag.entity';
import { HashtagRepository } from '../../db/hashtag.repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Result } from '../../../../core/result';
import { CreateHashtagDto } from '../../dto/createHashtag.dto';

export class CreateHashtagCommand {
  constructor(public readonly createHashtagDto: CreateHashtagDto[]) {}
}

@CommandHandler(CreateHashtagCommand)
export class CreateHashtagUseCase
  implements ICommandHandler<CreateHashtagCommand>
{
  constructor(private readonly hashtagRepo: HashtagRepository) {}

  async execute({
    createHashtagDto,
  }: CreateHashtagCommand): Promise<Result<Hashtag[]>> {
    //TODO:Problem: When you try to create several same hashtag it will give unique error
    const newHashtags = createHashtagDto.map((hashtagDto) => {
      const hashtag = new Hashtag();
      hashtag.normalized = hashtagDto.normalized;
      hashtag.title = hashtagDto.title;
      return hashtag;
    });

    const createdHashtags = await this.hashtagRepo.save(newHashtags);
    return Result.Ok(createdHashtags);
  }
}
