import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
} from '@nestjs/swagger';

import { BAD_REQUEST, UNAUTHORIZED } from '../swagger.constants';
import { BadRequestResponse } from '../../responses';
import { IssueResponseDto } from '../../../feature/issue/responses';

export function CreateIssueSwaggerDecorator() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: UNAUTHORIZED }),
    ApiOperation({
      summary: 'Create issue',
    }),
    ApiOkResponse({ type: IssueResponseDto }),
    ApiBadRequestResponse({
      description: BAD_REQUEST,
      type: BadRequestResponse,
    }),
  );
}
