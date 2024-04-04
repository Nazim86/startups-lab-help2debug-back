import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  Validate,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import {
  ERROR_FORMAT_EMAIL,
  ERROR_LENGTH_PASSWORD,
  ERROR_LENGTH_USERNAME,
} from '../user.constants';
import {
  IsPasswordMustContain,
  IsPasswordsMatchingConstraint,
} from '../decorators';

export class CreateUserDto {
  @ApiProperty({
    description: 'Username',
    type: 'string',
    example: 'new_user',
    minLength: 6,
    maxLength: 30,
    pattern: '0-9; A-Z; a-z; _ ; -',
  })
  @Matches('^[a-zA-Z0-9_-]*$')
  @Length(6, 30, { message: ERROR_LENGTH_USERNAME })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'email',
    type: 'string',
    example: 'test@gmail.com',
  })
  @IsEmail(
    {},
    {
      message: ERROR_FORMAT_EMAIL,
    },
  )
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'password',
    type: 'string',
    example: 'new_testA0!',
    minLength: 6,
    maxLength: 20,
    pattern: `0-9; A-Z; a-z;
              !"#$%& '()*+,-./:;<=>? @ [\]^
              _\` \{ \| \} ~`,
  })
  @Validate(IsPasswordMustContain)
  @Length(6, 20, { message: ERROR_LENGTH_PASSWORD })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Password confirmation',
    type: 'string',
    example: 'new_testA0!',
    minLength: 6,
    maxLength: 20,
    pattern: `0-9; A-Z; a-z;
            !"#$%& '()*+,-./:;<=>? @ [\]^
            _\` \{ \| \} ~`,
  })
  @Validate(IsPasswordsMatchingConstraint)
  passwordConfirm: string;
}
