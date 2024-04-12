import { InjectRepository } from '@nestjs/typeorm';
import { MentorSetting } from '../entities/mentorSetting.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class MentorSettingRepository {
  constructor(
    @InjectRepository(MentorSetting)
    private readonly mentorSettingRepo: Repository<MentorSetting>,
  ) {}

  async findSettingByUserId(userId: string): Promise<MentorSetting> {
    return this.mentorSettingRepo
      .createQueryBuilder('ms')
      .leftJoinAndSelect('ms.user', 'u')
      .where('u.id = :userId', { userId })
      .getOne();
  }

  async save(mentorSetting: MentorSetting): Promise<MentorSetting> {
    return this.mentorSettingRepo.save(mentorSetting);
  }
}
