import { AuthOptions, Session } from "next-auth";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";
import axiosInstance from "@/utils/axios-instance";
import axios from "axios";

async function refreshAccessToken(token: JWT) {
  try {
    // Since this will try to attach session, infinity loop will occur
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/access-token`,
      {
        refreshToken: token.refreshToken,
      }
    );
    const data = response.data;
    return {
      ...token,
      accessToken: data.accessToken,
      accessTokenExpires: data.accessTokenExpires,
      refreshToken: data.refreshToken ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const options: AuthOptions = {
  providers: [
    GithubProvider({
      profile(profile: GithubProfile, tokens) {
        // We can have a env variable with admin list to grant permission
        let userRole = "GithubUser";
        if (profile.email === "jstrfaheem065@gmail.com") {
          userRole = "Admin";
        }
        return {
          ...profile,
          id: profile.id.toString(),
          role: userRole,
          image: profile.avatar_url,
          accessToken: tokens.access_token,
          accessTokenExpires: tokens.expires_at,
          refreshToken: tokens.refresh_token,
        };
      },
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      profile(profile: GoogleProfile, tokens) {
        let userRole = "GoogleUser";
        return {
          ...profile,
          id: profile.sub,
          role: userRole,
          image: profile.picture,
          accessToken: tokens.access_token,
          accessTokenExpires: tokens.expires_at,
          refreshToken: tokens.refresh_token,
        };
      },
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      // This will generate form for us, Check /create-user to check it
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "Enter your email",
        },
      },
      async authorize(credentials) {
        try {
          const foundUser = await User.findOne({ email: credentials?.email });
          if (foundUser && credentials?.password) {
            console.log("User Exists");
            const match = await bcrypt.compare(
              credentials?.password,
              foundUser.password
            );
            if (match) {
              console.log("Good Pass");
              delete foundUser.password;
              foundUser["role"] = "Unverified Email";
              return {
                ...foundUser,
                // accessToken: "",
                // accessTokenExpires: "",
                // refreshToken: "",
              };
            }
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    // Ref: https://github.com/nextauthjs/next-auth/discussions/8884
    async signIn({ user, account }) {
      // if (account?.provider === "google") {
      const response = await axiosInstance.post(`/create-user`, {
        idToken: user.accessToken,
      });
      const backendUser = response.data;
      if (!backendUser) return false;
      user.accessToken = backendUser?.accessToken;
      user.accessTokenExpires = backendUser?.accessTokenExpires;
      user.refreshToken = backendUser?.refreshToken;
      user.name = backendUser?.name;
      return true;
      // }
      // return true;
    },
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
    // This will allow us to use role inside server site
    async jwt({ token, user, account }) {
      if (user) {
        token.name = user.name;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = user.accessTokenExpires;
      }
      // Ref: https://next-auth.js.org/v3/tutorials/refresh-token-rotation
      // Initial sign in
      if (account && user) {
        return token;
      } else if (
        token.accessTokenExpires &&
        Date.now() < token.accessTokenExpires
      ) {
        return token;
      }
      const freshToken = await refreshAccessToken(token);
      console.log({ freshToken });
      return freshToken;
    },
    // If you want to use the role in client components
    async session({ session, token }) {
      if (session?.user) {
        session.user.name = token.name;
        session.user.role = token.role;
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.accessTokenExpires = token.accessTokenExpires;
        session.error = token.error;
      }
      return session;
    },
  },
};
