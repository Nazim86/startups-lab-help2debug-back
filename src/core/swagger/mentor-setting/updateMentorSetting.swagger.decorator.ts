import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';

import {
  BAD_REQUEST,
  NOT_FOUND,
  NOT_PERMITTED,
  UNAUTHORIZED,
} from '../swagger.constants';
import { BadRequestResponse } from '../../responses';

export function UpdateMentorSettingSwaggerDecorator() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: UNAUTHORIZED }),
    ApiForbiddenResponse({ description: NOT_PERMITTED }),
    ApiNotFoundResponse({ description: NOT_FOUND }),
    ApiNoContentResponse(),
    ApiOperation({
      summary: 'Update mentor settings',
    }),
    //ApiOkResponse({ type: CreateSessionResponseDto }),
    ApiBadRequestResponse({
      description: BAD_REQUEST,
      type: BadRequestResponse,
    }),
  );
}
