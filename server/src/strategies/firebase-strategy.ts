import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import { FirebaseAuthenticationService } from '@aginix/nestjs-firebase-admin';

@Injectable()
export class FirebaseStrategy extends PassportStrategy(Strategy) {
  constructor(
    private firebaseAuthenticationService: FirebaseAuthenticationService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(token: string) {
    Logger.log(this.validate.name, {
      token,
    });
    return this.firebaseAuthenticationService.verifyIdToken(token, true);
  }
}
