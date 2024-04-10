import { Injectable } from '@nestjs/common';
import { JwtConfig } from '../../../core/jwt-adapter/jwt.config';
import { UserFacade } from '../../user/user.facade';
import { UserId } from '../../user/types';
import { USER_NOT_FOUND } from '../../user/user.constants';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UnauthorizedError } from '../../../core/config/exceptions';
import { AccessJwtPayloadType } from '../types/accessJwtPayload.type';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(
    private jwtConfig: JwtConfig,
    private userFacade: UserFacade,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.accessJwtSecret,
    });
  }

  async validate(payload: AccessJwtPayloadType): Promise<UserId> {
    const user = await this.userFacade.repository.findUserById(payload.userId);

    if (!user) throw new UnauthorizedError(USER_NOT_FOUND);

    return { userId: payload.userId };
  }
}
