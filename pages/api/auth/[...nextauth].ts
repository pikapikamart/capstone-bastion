import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { 
  Session,
  User} from "next-auth";
import { JWT } from "next-auth/jwt";
import { connectDatabase } from "@/api-lib/db";
import { findUser } from "@/api-lib/service/user.service";


type NextSession = {
  session: Session,
  user: User,
  token: JWT
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
      // Add logic here to look up the user from the credentials supplied
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
        // Any object returned will be saved in `user` property of the JWT
        return user
      } else {
        // If you return null then an error will be displayed advising the user to check their details.
        return Promise.reject(new Error("Authentication failed. Check your credentials."));

        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      }
    }
  })
]

const NextCallbacks = {
  async session({ session, user, token }: NextSession) {
    // const newSession = {
    //   ...session,
    //   user: {
    //     ...session.user,
    //     githubId: token.sub
    //   }
    // }
    console.log({session, user, token});
    return session;
    // return newSession; 
  }
  
}


const NextAuthOptions = {
  providers: NextProviders,
  // callbacks: NextCallbacks,
  pages: {
    signIn: "/auth/credentials-signin"
  },
  secret: process.env.HASH_SECRET as string
}

export default NextAuth(NextAuthOptions);