import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { randomString } from '../../tests.utils';

export class UserTestHelper {
  constructor(private app: INestApplication) {}

  userDto() {
    // const password = `${randomString(10)}TU1!`;
    return {
      username: randomString(10),
      email: `${randomString(6)}@test.com`,
    };
  }
}
