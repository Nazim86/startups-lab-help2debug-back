import { plainToInstance } from 'class-transformer';
import { UpdateUserDto } from './updateUser.dto';
import { validate } from 'class-validator';
import { randomString } from '@gateway/test/e2e.tests/utils/tests.utils';

describe('UpdateUserDto', () => {
  let correctInputData;

  beforeEach(() => {
    correctInputData = {
      username: 'new_user',
      firstName: 'Ivan',
      lastName: 'Ivanov',
      dateOfBirth: new Date(),
      country: 'Russia',
      city: 'Moscow',
      aboutMe: 'description',
    };
  });

  it('correct data', async () => {
    const updateUserDto = plainToInstance(UpdateUserDto, correctInputData);
    const errors = await validate(updateUserDto);
    expect(errors.length).toBe(0);
  });

  it('should be issued when required fields are not filled in', async () => {
    const updateUserDto = plainToInstance(UpdateUserDto, {});
    const errors = await validate(updateUserDto);
    expect(errors.length).not.toBe(0);

    const errorFields = errors.map((err) => err.property);
    expect(errorFields).toContain('username');
    expect(errorFields).toContain('firstName');
    expect(errorFields).toContain('lastName');
  });

  it('username field is missing ', async () => {
    delete correctInputData.username;
    const updateUserDto = plainToInstance(UpdateUserDto, correctInputData);
    const errors = await validate(updateUserDto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('username');
  });

  it('username length more than 30 ', async () => {
    correctInputData.username = randomString(31);
    const updateUserDto = plainToInstance(UpdateUserDto, correctInputData);
    const errors = await validate(updateUserDto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('username');
  });

  it('username incorrect value', async () => {
    correctInputData.username = 1;
    const updateUserDto = plainToInstance(UpdateUserDto, correctInputData);
    const errors = await validate(updateUserDto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('username');
  });

  it('firstName field is missing ', async () => {
    delete correctInputData.firstName;
    const updateUserDto = plainToInstance(UpdateUserDto, correctInputData);
    const errors = await validate(updateUserDto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('firstName');
  });

  it('firstName length more than 50 ', async () => {
    correctInputData.firstName = randomString(51);
    const updateUserDto = plainToInstance(UpdateUserDto, correctInputData);
    const errors = await validate(updateUserDto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('firstName');
  });

  it('firstName incorrect value', async () => {
    correctInputData.firstName = 1;
    const updateUserDto = plainToInstance(UpdateUserDto, correctInputData);
    const errors = await validate(updateUserDto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('firstName');
  });

  it('lastName field is missing ', async () => {
    delete correctInputData.lastName;
    const updateUserDto = plainToInstance(UpdateUserDto, correctInputData);
    const errors = await validate(updateUserDto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('lastName');
  });

  it('lastName length more than 50 ', async () => {
    correctInputData.lastName = randomString(51);
    const updateUserDto = plainToInstance(UpdateUserDto, correctInputData);
    const errors = await validate(updateUserDto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('lastName');
  });

  it('lastName incorrect value', async () => {
    correctInputData.lastName = 1;
    const updateUserDto = plainToInstance(UpdateUserDto, correctInputData);
    const errors = await validate(updateUserDto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('lastName');
  });

  it('dateOfBirth incorrect value', async () => {
    correctInputData.dateOfBirth = 's';
    const updateUserDto = plainToInstance(UpdateUserDto, correctInputData);
    const errors = await validate(updateUserDto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('dateOfBirth');
  });

  it('country incorrect value', async () => {
    correctInputData.country = 1;
    const updateUserDto = plainToInstance(UpdateUserDto, correctInputData);
    const errors = await validate(updateUserDto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('country');
  });

  it('city incorrect value', async () => {
    correctInputData.city = 1;
    const updateUserDto = plainToInstance(UpdateUserDto, correctInputData);
    const errors = await validate(updateUserDto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('city');
  });

  it('aboutMe length more than 50 ', async () => {
    correctInputData.aboutMe = randomString(201);
    const updateUserDto = plainToInstance(UpdateUserDto, correctInputData);
    const errors = await validate(updateUserDto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('aboutMe');
  });

  it('aboutMe incorrect value', async () => {
    correctInputData.aboutMe = 1;
    const updateUserDto = plainToInstance(UpdateUserDto, correctInputData);
    const errors = await validate(updateUserDto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('aboutMe');
  });
});
