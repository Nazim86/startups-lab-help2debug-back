import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { CreateDeviceUseCase } from './createDevice.usecase';
import { Device } from '../../entities/device.entity';

export * from './createDevice.usecase';

export const DEVICES_USE_CASES: Type<ICommandHandler>[] = [CreateDeviceUseCase];
export const DEVICE_ENTITIES = [Device];
