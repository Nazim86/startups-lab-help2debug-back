import { Controller, Body, Param, Put } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';

import { UpdateUserDto } from '../dto';
import { UpdateUserSwaggerDecorator } from '../../../core/swagger/user/updateUser.swagger.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor() {}
  @ApiOperation({
    summary: 'обновить профиль пользователя',
    description: 'Отправляем firstName, lastName, username*, tags[]',
  })
  @UpdateUserSwaggerDecorator()
  @Put(':id')
  async update(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return 'hello';
  }
}
