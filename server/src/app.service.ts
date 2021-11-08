import { Injectable } from '@nestjs/common';
import admin, { credential } from 'firebase-admin';

@Injectable()
export class AppService {
  constructor() {
    admin.initializeApp({
      credential: credential.cert('./src/serviceAccountKey.json'),
    });
  }
  async velidateToken(
    token: string,
  ): Promise<{ isLoggedIn: boolean; token: string; user: any }> {
    const authToken = token?.split(/\s/g)[1];
    console.log({ authToken });
    let user;
    if (authToken) {
      user = await admin.auth().verifyIdToken(authToken);
      console.log({ user });
    }
    return { isLoggedIn: false, token: authToken, user: user };
  }
}
