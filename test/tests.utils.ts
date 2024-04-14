import { v4 as uuidv4 } from 'uuid';
import { APP_GLOBAL_PREFIX } from '../src/core/config/config.constants';
import { TestingModule } from '@nestjs/testing';
import { configApp } from '../src/core/config';
import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';

export function getGlobalPrefix() {
  return APP_GLOBAL_PREFIX;
}

export const getAppForE2ETesting = async (testingModule: TestingModule) => {
  const app = testingModule.createNestApplication();
  configApp(app);
  await app.init();

  const developmentMode = process.env.NODE_ENV
    ? process.env.NODE_ENV === 'development'
    : false;
  if (developmentMode) {
    await truncateDBTables(app);
  }

  return app;
};

async function truncateDBTables(app: INestApplication) {
  // Fetch all the entities
  const dataSource = app.get<DataSource>(DataSource);

  await dataSource.query('');

  const tableNames = await dataSource.query(
    `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`,
  );

  // Truncate each table
  for (const { table_name } of tableNames) {
    await dataSource.query(`TRUNCATE TABLE "${table_name}" CASCADE`);
  }

  // const entities = dataSource.entityMetadatas;
  //
  // for (const entity of entities) {
  //   const repository = dataSource.getRepository(entity.name); // Get repository
  //   await repository.clear(); // Clear each entity table's content
  // }
}

export function randomString(n: number) {
  let rnd = '';
  while (rnd.length < n) rnd += Math.random().toString(36).substring(2);
  return rnd.substring(0, n);
}

export function randomUUID() {
  return uuidv4();
}

export function paramMock(mock) {
  const lastIndex = mock.calls.length - 1;
  return mock.calls[lastIndex];
}

export function getErrorMessagesBadRequest() {
  return {
    timestamp: expect.any(String),
    path: expect.any(String),
    message: [
      {
        field: '',
        message: expect.any(String),
      },
    ],
  };
}

export function findUUIDv4(message: string) {
  const res =
    /[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i.exec(
      message,
    );
  return res.length ? res[0] : '';
}
