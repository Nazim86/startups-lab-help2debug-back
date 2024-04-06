import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DEVICES_USE_CASES } from './application';
import { DeviceController } from './api/device.controller';
import { DeviceFacade } from './device.facade';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceRepository } from './db';
import { CqrsModule } from '@nestjs/cqrs';
import { JWTModule } from '../../core/jwt-adapter/jwt.module';
import { DEVICE_ENTITIES } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature(DEVICE_ENTITIES), CqrsModule, JWTModule],

  controllers: [DeviceController],
  providers: [
    ...DEVICES_USE_CASES,
    DeviceService,
    DeviceFacade,
    DeviceRepository,
  ],
  exports: [DeviceFacade],
})
export class DeviceModule {}
