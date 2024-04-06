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
import { ConnectSessionResponseDto } from '../../../feature/session/responses';

export function ConnectSessionSwaggerDecorator() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: UNAUTHORIZED }),
    ApiNotFoundResponse({ description: NOT_FOUND }),
    ApiOkResponse({ type: ConnectSessionResponseDto }),
    ApiOperation({
      summary: 'Connect to session',
    }),
    ApiBadRequestResponse({
      description: BAD_REQUEST,
      type: BadRequestResponse,
    }),
  );
}
