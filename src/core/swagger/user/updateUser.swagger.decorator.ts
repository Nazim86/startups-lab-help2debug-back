import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';

import {
  BAD_REQUEST,
  NOT_FOUND,
  NOT_PERMITTED,
  UNAUTHORIZED,
} from '../swagger.constants';
import { BadRequestResponse } from '../../responses';

export function UpdateUserSwaggerDecorator() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: UNAUTHORIZED }),
    ApiNoContentResponse(),
    ApiForbiddenResponse({ description: NOT_PERMITTED }),
    ApiNotFoundResponse({ description: NOT_FOUND }),
    ApiOperation({
      summary: 'Update user profiler',
    }),
    ApiNotFoundResponse({ description: NOT_FOUND }),
    ApiBadRequestResponse({
      description: BAD_REQUEST,
      type: BadRequestResponse,
    }),
  );
}
