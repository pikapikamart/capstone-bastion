import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { 
  Session,
  User,
  Account } from "next-auth";
import { JWT } from "next-auth/jwt";
import { connectDatabase } from "@/api-lib/db";
import { findUser } from "@/api-lib/service/user.service";


type NextCallbackSession = {
  session: Session,
  user: User,
  token: JWT
}

type NextCallbackJWT = {
  token: JWT,
  account: Account,
  user: User
}

const NextProviders = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      userType: { type: "hidden" },
      email: { label: "email", type: "text" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      const user = {
        userType: "writer",
        email: credentials?.email,
        password: credentials?.password
      }

      await connectDatabase(null, null, null);

      const checkUserExistence = await findUser({ 
        email: user.email,
        password: user.password 
      });
       
      if ( checkUserExistence ) {
        
        return user;
      } else {
        return Promise.reject(new Error("Authentication failed. Check your credentials."));
      }
    }
  })
]

const NextCallbacks = {
  async session({ session, user, token }: NextCallbackSession) {
    const newSession = {
      ...session,
      user: {
        ...session.user,
        userType: token.userType
      }
    }
    return newSession;
  },
  async jwt({ token, account, user }: NextCallbackJWT) {
    if (user) {
      token.accessToken = account.access_token;
      token.userType = user.userType;
    }

    return token;
  }
}

const NextSession = {
  strategy: ("jwt" as const)
}

const NextAuthOptions = {
  providers: NextProviders,
  callbacks: NextCallbacks,
  session: NextSession,
  pages: {
    signIn: "/auth/credentials-signin"
  },
  secret: process.env.HASH_SECRET as string
}

// @ts-ignore
export default NextAuth(NextAuthOptions);