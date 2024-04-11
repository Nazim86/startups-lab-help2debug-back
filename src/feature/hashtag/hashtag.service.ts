import { Injectable } from '@nestjs/common';
import { PageDto, PageMetaDto } from '../../core/dtos';
import { HashtagRepository } from './db/hashtag.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Hashtag } from './entities/hashtag.entity';
import { Repository } from 'typeorm';
import { HashtagQueryDto } from './dto/hashtagQuery.dto';

@Injectable()
export class HashtagService {
  constructor(
    private readonly hashtagRepo: HashtagRepository,
    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,
  ) {}
  async findAll(pageOptionsDto: HashtagQueryDto): Promise<PageDto<Hashtag>> {
    const { itemCount, entities } =
      await this.hashtagRepo.getHashtags(pageOptionsDto);

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }
}
