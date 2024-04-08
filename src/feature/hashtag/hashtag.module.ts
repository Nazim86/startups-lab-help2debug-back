import { Module } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { HashtagController } from './api/hashtag.controller';
import { HASHTAG_ENTITIES } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateHashtagUseCase } from './application/use-cases/createHashtag.usecase';
import { HashtagRepository } from './db/hashtag.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { HashtagFacade } from './hashtag.facade';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature(HASHTAG_ENTITIES)],
  controllers: [HashtagController],
  providers: [
    HashtagService,
    CreateHashtagUseCase,
    HashtagRepository,
    HashtagFacade,
  ],
  exports: [HashtagFacade],
})
export class HashtagModule {}
