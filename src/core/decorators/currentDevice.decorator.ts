import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { InternalServerError } from '../config/exceptions';

export const CurrentDevice = createParamDecorator(
  (data: unknown, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    if (!request.user || !request.user.deviceId)
      throw new InternalServerError('Haven`t deviceId in request');

    const { deviceId } = request.user;

    return deviceId;
  },
);
