import NextAuth from "next-auth/next";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { AuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
  providers: [
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
        },
      },

      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        const validUser =
          credentials.email === "akshay@test.com" &&
          credentials.password === "test";
        console.log("Value user", validUser);
        if (validUser)
          return {
            id: "123abc",
            email: credentials.email,
            image: "test-image-link",
            name: "Akshay",
          };
        return null;
      },
    }),

    Github({
      clientId: process.env.GITHUB_AUTH_CLIENT_ID || "abc",
      clientSecret: process.env.GITHUB_AUTH_CLIENT_SECRET || "abc",
    }),

    Google({
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID || "abc",
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET || "abc",
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
  secret: "default_secret_key",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
