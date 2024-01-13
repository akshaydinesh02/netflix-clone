import NextAuth from "next-auth/next";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { AuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

const authOptions: AuthOptions = {
  providers: [
    Github({
      clientId: process.env.GITHUB_AUTH_CLIENT_ID || "abc",
      clientSecret: process.env.GITHUB_AUTH_CLIENT_SECRET || "abc",
    }),
  ],
  // callbacks: {
  //   async session({
  //     session,
  //     token,
  //     user,
  //   }: {
  //     session: Session;
  //     token: JWT;
  //     user: AdapterUser;
  //   }) {
  //     // session.user.name =
  //     //   session?.user?.name?.split(" ").join("").toLocaleLowerCase() || "name";
  //     // session.user.uid = token.sub;

  //     // user.name =
  //     //   session?.user?.name?.split(" ").join("").toLocaleLowerCase() || "name";
  //     // user.id = token.sub || "uid";
  //     return session;
  //   },
  // },
  // secret: "default_secret_key",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
