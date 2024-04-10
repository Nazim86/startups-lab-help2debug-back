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
    saveHashtags: (hashtags: Hashtag[]) => this.saveHashtags(hashtags),
  };

  useCases = {};

  private findHashtags(hashtags: string[]): Promise<Hashtag[]> {
    return this.hashtagRepo.findHashtags(hashtags);
  }

  private saveHashtags(hashtags: Hashtag[]): Promise<Hashtag[]> {
    return this.hashtagRepo.save(hashtags);
  }
}
