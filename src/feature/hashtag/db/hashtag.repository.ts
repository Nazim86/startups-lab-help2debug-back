import { InjectRepository } from '@nestjs/typeorm';
import { Hashtag } from '../entities/hashtag.entity';
import { In, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashtagRepository {
  constructor(
    @InjectRepository(Hashtag)
    private readonly hashtagRepo: Repository<Hashtag>,
  ) {}

  async findHashtags(hashtags: string[]): Promise<Hashtag[]> {
    return this.hashtagRepo.findBy({ normalized: In(hashtags) });
  }

  async save(hashtags: Hashtag[]): Promise<Hashtag[]> {
    return this.hashtagRepo.save(hashtags);
  }
}
