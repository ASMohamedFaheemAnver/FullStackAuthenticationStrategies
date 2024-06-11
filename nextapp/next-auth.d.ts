import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      accessToken?: string;
      accessTokenExpires?: number;
      refreshToken?: string;
    } & DefaultSession["user"];
    error?: string;
  }

  interface User extends DefaultUser {
    role: string;
    accessToken?: string;
    accessTokenExpires?: number;
    refreshToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: string;
    accessToken?: string;
    accessTokenExpires?: number;
    refreshToken?: string;
    error?: string;
  }
}
