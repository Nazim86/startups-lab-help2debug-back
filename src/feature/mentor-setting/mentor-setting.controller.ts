import { Body, Controller, Param, Put } from '@nestjs/common';
import { MentorSettingService } from './mentor-setting.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateMentorSettingDto } from './dto/updateMentorSettingDto';
import { UpdateMentorSettingSwaggerDecorator } from '../../core/swagger/mentor-setting/updateMentorSetting.swagger.decorator';

@ApiTags('Mentor Settings')
@Controller('mentor-setting')
export class MentorSettingController {
  constructor(private readonly mentorSettingService: MentorSettingService) {}

  @ApiOperation({
    summary: 'обновить менторские настройки',
    description:
      'Какой тип помощи (интервью, кодревью и т.д.) и ссылка на видео-конеференцию (googlmeet, zoom и т. д.)',
  })
  @UpdateMentorSettingSwaggerDecorator()
  @Put(':id')
  update(
    @Param('id') mentorId: string,
    @Body() updateSettingDto: UpdateMentorSettingDto,
  ) {
    return 'mentor  settings';
  }
}
