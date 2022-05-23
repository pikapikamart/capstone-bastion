import "@/api-lib/models/userModel";
import { 
  NextApiRequest,
  NextApiResponse } from "next";
import { UserDocument } from "../models/userModel";
import { findUser } from "../service/user.service";


export const createUserHandler = async(
  req: NextApiRequest,
  res: NextApiResponse
) =>{
  const userBody: UserDocument = { ...req.body };

  try {

  } catch( err ) {
    
  }
}