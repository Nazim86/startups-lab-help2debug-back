import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CreateUserDto } from '../dto';
import { Injectable } from '@nestjs/common';
import { ERROR_PASSWORDS_MUST_MATCH } from '../user.constants';

@Injectable()
@ValidatorConstraint({ name: 'IsPasswordsMathing', async: false })
export class IsPasswordsMatchingConstraint
  implements ValidatorConstraintInterface
{
  validate(passwordRepeat: string, args: ValidationArguments) {
    const obj = args.object as CreateUserDto;
    return obj.password === passwordRepeat;
  }
  defaultMessage?(): string {
    return ERROR_PASSWORDS_MUST_MATCH;
  }
}
