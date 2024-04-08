import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { HashtagRepository } from './db/hashtag.repository';
import { Hashtag } from './entities/hashtag.entity';

@Injectable()
export class HashtagFacade {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly hashtagRepo: HashtagRepository,
  ) {}

  repository = {
    findHashtags: (hashtags: string[]): Promise<Hashtag[]> =>
      this.findHashtags(hashtags),
  };

  useCases = {};

  private findHashtags(hashtags: string[]): Promise<Hashtag[]> {
    return this.hashtagRepo.findHashtags(hashtags);
  }
}
