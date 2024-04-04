// import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
// import { UpdateUserDto } from '../../dto';
// import { BadRequestError, NotFoundError, Result } from '@gateway/src/core';
// import { UserRepository } from '../../db';
// import {
//   ERROR_LESS_THAN_13_YEARS_OLD,
//   ERROR_USERNAME_IS_ALREADY_REGISTRED,
//   USER_NOT_FOUND,
// } from '../../user.constants';
// import add from 'date-fns/add';
//
// export class UpdateUserCommand {
//   constructor(
//     public userId: string,
//     public updateDto: UpdateUserDto,
//   ) {}
// }
//
// @CommandHandler(UpdateUserCommand)
// export class UpdateUserUseCase implements ICommandHandler {
//   constructor(private readonly userRepo: UserRepository) {}
//
//   async execute({ userId, updateDto }: UpdateUserCommand): Promise<Result> {
//     const thirteenYears = add(updateDto.dateOfBirth, { years: 13 });
//     if (thirteenYears > new Date()) {
//       return Result.Err(
//         new BadRequestError(ERROR_LESS_THAN_13_YEARS_OLD, 'dateOfBirth'),
//       );
//     }
//
//     const userByLogin = await this.userRepo.findByUsernameOrEmail(
//       updateDto.username,
//     );
//     if (userByLogin && userByLogin.id !== userId) {
//       return Result.Err(
//         new BadRequestError(ERROR_USERNAME_IS_ALREADY_REGISTRED, 'username'),
//       );
//     }
//
//     const user = await this.userRepo.findById(userId);
//     if (!user) {
//       return Result.Err(new NotFoundError(USER_NOT_FOUND));
//     }
//
//     const data = { ...updateDto, name: updateDto.username };
//     delete data.username;
//
//     await this.userRepo.update(userId, data);
//     return Result.Ok();
//   }
// }
