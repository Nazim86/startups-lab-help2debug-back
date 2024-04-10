import { Module } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { HashtagController } from './api/hashtag.controller';
import { HASHTAG_ENTITIES } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashtagRepository } from './db/hashtag.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { HashtagFacade } from './hashtag.facade';
import { CreateHashtagUseCase } from './application/use-case/createHashtag.usecase';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature(HASHTAG_ENTITIES)],
  controllers: [HashtagController],
  providers: [
    HashtagService,
    HashtagRepository,
    HashtagFacade,
    CreateHashtagUseCase,
  ],
  exports: [HashtagFacade],
})
export class HashtagModule {}
