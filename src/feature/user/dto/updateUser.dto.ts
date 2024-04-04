import { ApiProperty } from '@nestjs/swagger';
import {
  Matches,
  Length,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDate,
} from 'class-validator';
import {
  ERROR_LENGTH_ABOUT_ME,
  ERROR_LENGTH_FIRST_NAME,
  ERROR_LENGTH_LAST_NAME,
  ERROR_LENGTH_USERNAME,
} from '../user.constants';
import { Type } from 'class-transformer';

export class UpdateUserDto {
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
    description: 'Date of birth',
    type: 'date',
    example: '2023-12-25T00:00:00.000Z',
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dateOfBirth: Date;

  @ApiProperty({
    description: 'Country',
    type: 'string',
    example: 'Russia',
    required: false,
  })
  @IsString()
  @IsOptional()
  country: string;

  @ApiProperty({
    description: 'City',
    type: 'string',
    example: 'Moscow',
    required: false,
  })
  @IsString()
  @IsOptional()
  city: string;

  @ApiProperty({
    description: 'About me',
    type: 'string',
    example: 'backend developer',
    minLength: 0,
    maxLength: 200,
    required: false,
  })
  @Length(0, 200, { message: ERROR_LENGTH_ABOUT_ME })
  @IsString()
  @IsOptional()
  aboutMe: string;
}
