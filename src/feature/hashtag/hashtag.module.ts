import { Module } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { HashtagController } from './api/hashtag.controller';
import { HASHTAG_ENTITIES } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature(HASHTAG_ENTITIES)],
  controllers: [HashtagController],
  providers: [HashtagService],
})
export class HashtagModule {}
