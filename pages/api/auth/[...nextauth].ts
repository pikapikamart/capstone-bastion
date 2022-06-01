import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { 
  Session,
  User,
  Account } from "next-auth";
import { JWT } from "next-auth/jwt";
import { connectDatabase } from "@/api-lib/db";
import { findWriter } from "@/api-lib/service/writer.service";
import { WriterDocument } from "@/api-lib/models/writerModel";
import { StudentDocument } from "@/api-lib/models/studentModel";
import { findStudent } from "@/api-lib/service/student.service";


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
        userType: credentials?.userType,
        email: credentials?.email,
        password: credentials?.password
      }
      let userExistence: WriterDocument | StudentDocument | null = null;

      await connectDatabase(null, null, null);
      
      if ( user.userType==="writer" ) {
        userExistence = await findWriter({ email: user.email });

      } else if ( user.userType==="student" ) {
        userExistence = await findStudent({ email: user.email });
      }

      if ( userExistence ) {
        const isOwned = await userExistence.comparePassword(user.password as string);

        if ( isOwned ) {
          return user;
        }
      } 

      return Promise.reject(new Error("Authentication failed. Check your credentials."));
    }
  })
]

const NextCallbacks = {
  async session({ session, user, token }: NextCallbackSession) {
    const newSession = {
      ...session,
      user: {
        ...session.user,
        userType: token.userType,
        password: token.password
      }
    }
    return newSession;
  },
  async jwt({ token, account, user }: NextCallbackJWT) {

    if (user) {
      token.accessToken = account.access_token;
      token.userType = user.userType;
      token.password = user.password;
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