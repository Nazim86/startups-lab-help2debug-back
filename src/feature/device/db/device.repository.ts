import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from '../entities/device.entity';

@Injectable()
export class DeviceRepository {
  constructor(
    @InjectRepository(Device) private readonly deviceRepo: Repository<Device>,
  ) {}

  async saveDevice(device: Device) {
    return this.deviceRepo.save(device);
  }
}
