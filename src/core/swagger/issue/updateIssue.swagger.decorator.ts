import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
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
import { IssueResponseDto } from '../../../feature/issue/responses';

export function UpdateIssueSwaggerDecorator() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: UNAUTHORIZED }),
    ApiForbiddenResponse({ description: NOT_PERMITTED }),
    ApiNotFoundResponse({ description: NOT_FOUND }),
    ApiNoContentResponse(),
    ApiOperation({
      summary: 'Update issue',
    }),
    //ApiOkResponse({ type: CreateSessionResponseDto }),
    ApiBadRequestResponse({
      description: BAD_REQUEST,
      type: BadRequestResponse,
    }),
  );
}
