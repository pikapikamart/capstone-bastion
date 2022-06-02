import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import { WriterDocument } from "../models/writerModel";
import { findWriter } from "../service/writer.service";


export const getCurrentWriter = async ( req: NextApiRequest ): Promise<WriterDocument | null> => {
  const writerSession = await getSession({ req });

  if ( writerSession && writerSession.user ) {
    const writerAccount = await findWriter({ email: writerSession.user.email })

    return writerAccount;
  }

  return null;
}
