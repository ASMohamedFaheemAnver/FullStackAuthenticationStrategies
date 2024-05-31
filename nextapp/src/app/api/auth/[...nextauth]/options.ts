import { AuthOptions } from "next-auth";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcrypt";

export const options: AuthOptions = {
  providers: [
    GithubProvider({
      profile(profile: GithubProfile) {
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
        };
      },
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      profile(profile: GoogleProfile) {
        let userRole = "GoogleUser";
        return {
          ...profile,
          id: profile.sub,
          role: userRole,
          image: profile.picture,
        };
      },
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
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
              return foundUser;
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
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
    // This will allow us to use role inside server site
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    // If you want to use the role in client components
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};
