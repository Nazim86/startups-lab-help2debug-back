import { InjectRepository } from '@nestjs/typeorm';
import { Hashtag } from '../entities/hashtag.entity';
import { In, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { HashtagQueryDto } from '../dto/hashtagQuery.dto';

@Injectable()
export class HashtagRepository {
  constructor(
    @InjectRepository(Hashtag)
    private readonly hashtagRepo: Repository<Hashtag>,
  ) {}

  async findHashtags(hashtags: string[]): Promise<Hashtag[]> {
    return this.hashtagRepo.findBy({ normalized: In(hashtags) });
  }

  async getHashtags(pageOptionsDto: HashtagQueryDto) {
    // let searchTitleTerm = pageOptionsDto.searchTitleTerm;

    const queryBuilder = this.hashtagRepo.createQueryBuilder('hashtag');

    if (pageOptionsDto.searchTitleTerm) {
      const searchTitleTerm = pageOptionsDto.searchTitleTerm
        .toLowerCase()
        .replace(/\s+/g, '');

      queryBuilder.where('hashtag.normalized LIKE :searchTitleTerm', {
        searchTitleTerm: `%${searchTitleTerm}%`,
      });
    }

    queryBuilder
      .orderBy('hashtag.normalized', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    return { itemCount, entities };
  }

  async save(hashtags: Hashtag[]): Promise<Hashtag[]> {
    return this.hashtagRepo.save(hashtags);
  }
}
