import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateMentorSettingDto } from '../../dto/updateMentorSettingDto';
import { MentorSettingRepository } from '../../db/mentorSetting.repository';
import { Result } from '../../../../core/result';
import { NotFoundError } from '../../../../core/config/exceptions';
import { MENTOR_SETTINGS_NOT_FOUND } from '../../mentor-setting.constants';

export class UpdateMentorSettingsCommand {
  constructor(
    public readonly updateSettingDto: UpdateMentorSettingDto,
    public readonly userId: string,
  ) {}
}

@CommandHandler(UpdateMentorSettingsCommand)
export class UpdateMentorSettingsUseCase
  implements ICommandHandler<UpdateMentorSettingsCommand>
{
  constructor(private readonly mentorSettingRepo: MentorSettingRepository) {}

  async execute({
    updateSettingDto,
    userId,
  }: UpdateMentorSettingsCommand): Promise<Result> {
    const mentorSetting =
      await this.mentorSettingRepo.findSettingByUserId(userId);

    if (!mentorSetting) {
      return Result.Err(new NotFoundError(MENTOR_SETTINGS_NOT_FOUND));
    }

    mentorSetting.videoConferenceLink = updateSettingDto.videoConferenceLink;
    mentorSetting.helpType = updateSettingDto.helpType;
    mentorSetting.status = updateSettingDto.liveStatus;
    mentorSetting.statusUpdate = new Date();

    await this.mentorSettingRepo.save(mentorSetting);

    return Result.Ok(); //TODO: Do I need to return anything?
  }
}
