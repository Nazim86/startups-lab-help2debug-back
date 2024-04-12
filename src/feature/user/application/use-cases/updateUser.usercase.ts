import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserDto } from '../../dto';
import { UserRepository } from '../../db';
import { USER_NOT_FOUND } from '../../user.constants';
import { NotFoundError } from '../../../../core/config/exceptions';
import { Result } from '../../../../core/result';

import { CreateHashtagCommand } from '../../../hashtag/application/use-case/createHashtag.usecase';

export class UpdateUserCommand {
  constructor(
    public userId: string,
    public updateDto: UpdateUserDto,
  ) {}
}

@CommandHandler(UpdateUserCommand)
export class UpdateUserUseCase implements ICommandHandler {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly commandBus: CommandBus,
  ) {}

  async execute({ userId, updateDto }: UpdateUserCommand): Promise<Result> {
    const user = await this.userRepo.findUserById(userId);

    if (!user) {
      return Result.Err(new NotFoundError(USER_NOT_FOUND));
    }

    //TODO: cover with transaction

    const createdHashtags = await this.commandBus.execute(
      new CreateHashtagCommand(updateDto.hashtags),
    );

    if (!createdHashtags.isSuccess) {
      return Result.Err(createdHashtags.err);
    }

    user.username = updateDto.username;
    user.firstName = updateDto.firstName;
    user.lastName = updateDto.lastName;
    user.companyName = updateDto.company;
    user.hashtag = createdHashtags;
    user.tier = updateDto.tier;
    user.coin = updateDto.coin;

    //TODO: Need to update issue.hashtag?

    await this.userRepo.saveUser(user);

    return Result.Ok(); //TODO: Need to return updated user?
  }
}
