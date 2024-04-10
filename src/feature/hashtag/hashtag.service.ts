import { Injectable } from '@nestjs/common';

@Injectable()
export class HashtagService {
  findAll() {
    return `This action returns all hashtag`;
  }
}
