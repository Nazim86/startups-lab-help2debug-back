import { ApiProperty } from '@nestjs/swagger';
import {
  Matches,
  Length,
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import {
  ERROR_LENGTH_ABOUT_ME,
  ERROR_LENGTH_FIRST_NAME,
  ERROR_LENGTH_LAST_NAME,
  ERROR_LENGTH_USERNAME,
} from '../user.constants';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Username',
    type: 'string',
    example: 'new_user',
    minLength: 6,
    maxLength: 30,
    pattern: '0-9; A-Z; a-z; _ ; -',
    required: true,
  })
  @Matches('^[a-zA-Z0-9_-]*$')
  @Length(6, 30, { message: ERROR_LENGTH_USERNAME })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'First name',
    type: 'string',
    example: 'Ivan',
    minLength: 1,
    maxLength: 50,
    pattern: 'A-Z; a-z; А-Я ; а-я',
  })
  @Matches('^[a-zA-ZА-Яа-я]*$')
  @Length(1, 50, { message: ERROR_LENGTH_FIRST_NAME })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'Last name',
    type: 'string',
    example: 'Ivanov',
    minLength: 1,
    maxLength: 50,
    pattern: 'A-Z; a-z; А-Я ; а-я',
  })
  @Matches('^[a-zA-ZА-Яа-я]*$')
  @Length(1, 50, { message: ERROR_LENGTH_LAST_NAME })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'Hashtags',
    type: 'string',
    example: '[#Nestjs,#MongoDB]',
    minLength: 3,
    maxLength: 50,
    required: false,
  })
  @Length(0, 200, { message: ERROR_LENGTH_ABOUT_ME })
  @IsString()
  @IsOptional()
  tags: string[];
}
