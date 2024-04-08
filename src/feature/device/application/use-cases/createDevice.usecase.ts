import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeviceDto } from '../../dto';
import { randomUUID } from 'crypto';
import { DeviceRepository } from '../../db';
import { CreateTokensType } from '../../types/createTokens.type';
import { JwtAdapter } from '../../../../core/jwt-adapter/jwt.adapter';
import { Result } from '../../../../core/result';
import { Device } from '../../entities';

export class CreateDeviceCommand {
  constructor(public deviceDto: DeviceDto) {}
}

@CommandHandler(CreateDeviceCommand)
export class CreateDeviceUseCase
  implements ICommandHandler<CreateDeviceCommand>
{
  constructor(
    private readonly jwtAdapter: JwtAdapter,
    private readonly deviceRepo: DeviceRepository,
  ) {}

  async execute({
    deviceDto,
  }: CreateDeviceCommand): Promise<Result<CreateTokensType>> {
    const { userId, title, ip } = deviceDto;

    const deviceId = randomUUID();

    const { accessToken, refreshToken } = await this.createTokens(
      userId,
      deviceId,
    );

    // decode token to take iat and exp
    const { iat, exp } = this.decodeRefreshToken(refreshToken);

    //deviceDto
    const newDevice: Device = new Device();
    newDevice.id = deviceId;
    newDevice.ip = ip;
    newDevice.title = title;
    newDevice.userId = userId;
    newDevice.lastActiveDate = new Date(iat * 1000);
    newDevice.expirationDate = new Date(exp * 1000);

    await this.deviceRepo.saveDevice(newDevice);

    return Result.Ok({ accessToken, refreshToken });
  }

  private async createTokens(userId: string, deviceId: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtAdapter.createAccessToken(userId),
      this.jwtAdapter.createRefreshToken(userId, deviceId),
    ]);
    return { accessToken, refreshToken };
  }

  private decodeRefreshToken(token: string) {
    return this.jwtAdapter.decodeToken(token);
  }
}
