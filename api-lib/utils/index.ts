import { getSession } from "next-auth/react";
import { findUser } from "../service/user.service";


export const getCurrentUser = async () =>{
  const userSession = await getSession();

  if ( userSession && userSession.user ) {
    const userAccount = await findUser({
      userType: userSession.user.userType,
      email: userSession.user.email
    });

    return userAccount;
  }

  return false;
}