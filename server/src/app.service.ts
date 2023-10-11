import { Injectable } from '@nestjs/common';
import admin, { credential } from 'firebase-admin';

@Injectable()
export class AppService {
  constructor() {
    admin.initializeApp({
      credential: credential.cert('./src/serviceAccountKey.json'),
    });
  }
  async validateToken(
    token: string,
  ): Promise<{ isLoggedIn: boolean; token: string; user: any }> {
    const authToken = token?.split(/\s/g)[1];
    if (authToken) console.log({ authToken });
    let user;
    if (authToken) {
      user = await admin.auth().verifyIdToken(authToken);
      console.log({ user });
      console.log({
        expiredIn: new Date(
          new Date().setTime(user.exp * 1000),
        ).toLocaleTimeString(),
      });
    }
    return { isLoggedIn: !!user, token: authToken, user: user };
  }
}
