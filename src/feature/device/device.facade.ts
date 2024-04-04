import { CommandBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { CreateTokensType } from './types/createTokens.type';
import { Result } from '../../core/result';
import { DeviceDto } from './dto';
import { CreateDeviceCommand } from './application';

@Injectable()
export class DeviceFacade {
  constructor(private readonly commandBus: CommandBus) {}

  useCases = {
    createDevice: (deviceDto: DeviceDto): Promise<Result<CreateTokensType>> =>
      this.createDevice(deviceDto),
  };
  private async createDevice(
    deviceDto: DeviceDto,
  ): Promise<Result<CreateTokensType>> {
    return this.commandBus.execute<
      CreateDeviceCommand,
      Result<CreateTokensType>
    >(new CreateDeviceCommand(deviceDto));
  }
}
