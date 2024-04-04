import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Validate,
  validate,
} from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export class LoginDto {
  constructor(email, password) {
    this.password = password;
    this.email = email;
  }

  @ApiProperty()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Length(3, 50)
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  //@Validate(IsPasswordMustContain)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Length(6, 20)
  @IsString()
  @IsNotEmpty()
  password: string;

  async validate() {
    const errors = await validate(this);
    if (errors.length > 0)
      throw new BadRequestException(
        errors.map((e) => ({
          message: Object.values(e.constraints!)[0],
          field: e.property,
        })),
      );
    return;
  }
}
