import { Controller, Body, Put, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';

import { UpdateUserDto } from '../dto';
import { UpdateUserSwaggerDecorator } from '../../../core/swagger/user/updateUser.swagger.decorator';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUserId } from '../../../core/decorators/currentUserId.decorator';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../application/use-cases/updateUser.usercase';
import { AccessTokenGuard } from '../../auth/guards/accessJwt.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}
  @ApiOperation({
    summary: 'Update user profile',
    description: 'Отправляем firstName, lastName, username*, tags[]',
  })
  @UseGuards(AccessTokenGuard)
  @UpdateUserSwaggerDecorator()
  @Put()
  async update(
    @CurrentUserId() userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updateResult = await this.commandBus.execute(
      new UpdateUserCommand(userId, updateUserDto),
    );

    if (!updateResult.isSuccess) {
      throw updateResult.err;
    }

    return updateResult;
  }
}
