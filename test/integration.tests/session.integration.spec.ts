import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { getAppForE2ETesting } from '../tests.utils';
import { User } from '../../src/feature/user/entities/user.entity';
import { UserRepository } from '../../src/feature/user/db';
import { UserTestHelper } from './testHelpers/user.test.helper';
import { IssueTestHelper } from './testHelpers/issue.test.helper';
import { IssueRepository } from '../../src/feature/issue/db/issue.repository';
import { Issue } from '../../src/feature/issue/entities/issue.entity';
import {
  CreateIssueCommand,
  CreateIssueUseCase,
} from '../../src/feature/issue/application/use-cases';
import { CommandBus } from '@nestjs/cqrs';
import { Result } from '../../src/core/result';
import { IssueQueryRepository } from '../../src/feature/issue/db/issue.query.repository';

jest.setTimeout(15000);

describe('Session.integration', () => {
  let app: INestApplication;
  const user: User[] = [];
  const issue = [];
  //let student: User;
  let userRepo: UserRepository;
  let issueQueryRepo: IssueQueryRepository;
  let createIssueUseCase: CreateIssueUseCase;
  let userTestHelper: UserTestHelper;
  let issueTestHelper: IssueTestHelper;

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = await getAppForE2ETesting(testingModule);
    userRepo = testingModule.get<UserRepository>(UserRepository);
    createIssueUseCase =
      testingModule.get<CreateIssueUseCase>(CreateIssueUseCase);

    userTestHelper = new UserTestHelper(app);
    issueTestHelper = new IssueTestHelper(app);
    issueQueryRepo =
      testingModule.get<IssueQueryRepository>(IssueQueryRepository);
  });

  afterAll(async () => {
    await app.close();
  });
  describe('Session flow testing', () => {
    it('Create users', async () => {
      for (let i = 0; i < 5; i++) {
        const createMentorDto = userTestHelper.userDto();
        const newUser = new User();
        newUser.username = createMentorDto.username;
        newUser.email = createMentorDto.email;

        const createdUser = await userRepo.saveUser(newUser);

        user.push(createdUser);

        expect(createdUser.username).toBe(newUser.username);
        expect(createdUser.email).toBe(newUser.email);
      }
    });

    it('Create three issues for one student', async () => {
      for (let i = 0; i < 3; i++) {
        const createIssueDto = issueTestHelper.issueDto();

        const studentId = user[0].id;

        const newIssue: Result<string> = await createIssueUseCase.execute(
          new CreateIssueCommand(createIssueDto, studentId),
        );
        const issueView = await issueQueryRepo.getIssueViewById(newIssue.value);

        const issueTitles = issueView.hashtag.map((item) => item.title);

        issue.push(issueView);

        expect(issueView.userId).toBe(studentId);
        expect(issueView.type).toBe(createIssueDto.type);
        expect(issueTitles).toEqual(createIssueDto.hashtags);
      }
    });
  });
});
