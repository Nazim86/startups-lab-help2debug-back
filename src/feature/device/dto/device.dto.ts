export class DeviceDto {
  constructor(
    public readonly ip: string,
    public readonly title: string,
    public readonly userId: string,
  ) {}
}
