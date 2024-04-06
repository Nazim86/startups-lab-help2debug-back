import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

import {
  BAD_REQUEST,
  NOT_FOUND,
  NOT_PERMITTED,
  UNAUTHORIZED,
} from '../swagger.constants';
import { BadRequestResponse } from '../../responses';
import {
  ConnectSessionResponseDto,
  CreateSessionResponseDto,
} from '../../../feature/session/responses';
import { AllSessionResponseDto } from '../../../feature/session/responses/getAllSessionResponse.dto';

export function GetAllSessionSwaggerDecorator() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: UNAUTHORIZED }),
    ApiOkResponse({ type: AllSessionResponseDto, isArray: true }),
    ApiOperation({
      summary: 'Get all sessions',
    }),
  );
}
