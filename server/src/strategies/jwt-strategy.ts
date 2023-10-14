import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvKeys } from 'src/constants/strings';
import { Types } from 'mongoose';
import { User } from 'src/common/user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      secretOrKey: configService.get<string>(EnvKeys.JWT_SECRET),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: {
    _id: Types.ObjectId;
    type: string;
    iat: number;
    exp: number;
  }): Promise<User> {
    try {
      Logger.log(this.validate.name, {
        payload,
      });
    } catch (e) {
      console.log({ e });
    }
    // Need to use payload and return user data
    return { name: 'UDEV' };
  }
}
