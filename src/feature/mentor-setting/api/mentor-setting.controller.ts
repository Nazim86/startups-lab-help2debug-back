import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateMentorSettingDto } from '../dto/updateMentorSettingDto';
import { UpdateMentorSettingSwaggerDecorator } from '../../../core/swagger/mentor-setting/updateMentorSetting.swagger.decorator';
import { CommandBus } from '@nestjs/cqrs';
import { CurrentUserId } from '../../../core/decorators/currentUserId.decorator';
import { UpdateMentorSettingsCommand } from '../application/use-case/updateMentorSettings.usecase';
import { AccessTokenGuard } from '../../auth/guards/accessJwt.guard';

@ApiTags('Mentor Settings')
@UseGuards(AccessTokenGuard)
@Controller('mentor-setting')
export class MentorSettingController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createMentorSetting() {} // @Body() createMentorSettingDto: CreateMentorSettingDto,
  @ApiOperation({
    summary: 'обновить менторские настройки',
    description:
      'Какой тип помощи (интервью, кодревью и т.д.) и ссылка на видео-конеференцию (googlmeet, zoom и т. д.)',
  })
  @UpdateMentorSettingSwaggerDecorator()
  @Put()
  async updateMentorSetting(
    @CurrentUserId() userId: string,
    @Body() updateSettingDto: UpdateMentorSettingDto,
  ) {
    const updateResult = await this.commandBus.execute(
      new UpdateMentorSettingsCommand(updateSettingDto, userId),
    );

    if (!updateResult.isSuccess) {
      throw updateResult.err;
    }
    return updateResult.value;
  }
}
