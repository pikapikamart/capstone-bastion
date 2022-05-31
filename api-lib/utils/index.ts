import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import { findWriter } from "../service/writer.service";


export const getCurrentWriter = async ( req: NextApiRequest ) => {
  const writerSession = await getSession({ req });

  if ( writerSession && writerSession.user ) {
    const writerAccount = await findWriter({
      email: writerSession.user.email,
      password: writerSession.user.password
    })

    return writerAccount;
  }

  return false;
}