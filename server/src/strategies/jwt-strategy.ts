import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvKeys } from 'src/constants/strings';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      secretOrKey: configService.get<string>(EnvKeys.JWT_SECRET),
      jwtFromRequest: ExtractJwt.fromHeader('Authorization'),
    });
  }

  async validate(payload: { name: string; iat: number; exp: number }) {
    try {
      Logger.log(this.validate.name, {
        payload,
      });
    } catch (e) {
      console.log({ e });
    }
    // Need to use payload and return user data
    return payload;
  }
}
