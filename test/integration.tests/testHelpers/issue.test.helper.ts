import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { randomString } from '../../tests.utils';
import { HelpType } from '../../../src/feature/mentor-setting/types/helpType.enum';

export class IssueTestHelper {
  constructor(private app: INestApplication) {}

  issueDto() {
    // const password = `${randomString(10)}TU1!`;
    return {
      type: this.getRandomEnum(HelpType),
      title: randomString(10),
      description: randomString(30),
      hashtags: [randomString(5), randomString(5), randomString(5)],
    };
  }

  private getRandomEnum<T>(enumeration: T): T[keyof T] {
    const enumValues = Object.values(enumeration);
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randomIndex] as T[keyof T];
  }
}
