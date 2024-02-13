import NextAuth from "next-auth/next";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { AuthOptions, User as AuthUser, Account } from "next-auth";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";
import db from "@/database";
import User from "@/models/userSchema";
import bcrypt from "bcryptjs";

const authOptions: AuthOptions = {
  providers: [
    Github({
      clientId: process.env.GITHUB_AUTH_CLIENT_ID || "abc",
      clientSecret: process.env.GITHUB_AUTH_CLIENT_SECRET || "abc",
    }),

    Google({
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID || "abc",
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET || "abc",
    }),

    Credentials({
      name: "Email",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },

      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        await db();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) return user;
          }
        } catch (error: any) {
          console.error("Error while logging in user through email", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: AuthUser;
      account: Account | null;
    }) {
      console.log("Account from callback", account, user);
      // Email
      if (account?.provider === "credentials") {
        return true;
      }

      // Github
      if (account?.provider === "github") {
        await db();
        try {
          const userExists = await User.findOne({ email: user.email });
          if (!userExists) {
            const newUser = new User({
              email: user.email,
              provider: account?.provider,
            });
            await newUser.save();
            return true;
          }
          return true;
        } catch (error: any) {
          console.error("Error saving github user to db", error);
          return false;
        }
      }

      // Google
      if (account?.provider === "google") {
        await db();
        try {
          const userExists = await User.findOne({ email: user.email });
          if (!userExists) {
            const newUser = new User({
              email: user.email,
              provider: account?.provider,
            });
            await newUser.save();
            return true;
          }
          return true;
        } catch (error: any) {
          console.error("Error saving google user to db", error);
          return false;
        }
      }
      return false;
    },
    async session({
      session,
      token,
      user,
    }: {
      session: any;
      token: JWT;
      user: AdapterUser | null | undefined;
    }) {
      session.user.username =
        session?.user?.name?.split(" ").join("").toLocaleLowerCase() ||
        "username";

      try {
        const userExists = await User.findOne({ email: session.user.email });
        if (userExists) {
          session.user.uid = userExists._id;
        }
      } catch (error: any) {
        console.error("Error while setting uid", error);
        session.user.uid = token.sub;
      }
      return session;
    },
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        // token.id = profile?.id;
      }
      return token;
    },
  },
  secret: "default_secret_key",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
