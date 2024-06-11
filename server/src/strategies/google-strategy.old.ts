import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { EnvKeys, PassportAuthStrategies } from 'src/constants/strings';

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  Strategy,
  PassportAuthStrategies.google,
) {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>(EnvKeys.GOOGLE_CLIENT_ID),
      clientSecret: configService.get<string>(EnvKeys.GOOGLE_CLIENT_SECRET),
      callbackURL: configService.get<string>(EnvKeys.GOOGLE_CALLBACK_URL),
      scope: ['email', 'profile'],
      session: false,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, displayName, emails, photos } = profile;
    console.log({ profile });
    const user = {
      googleId: id,
      name: displayName,
      email: emails[0].value,
      photo: photos[0].value,
      accessToken,
      refreshToken,
    };
    done(null, user);
  }
}
