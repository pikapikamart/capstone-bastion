import "@/api-lib/models/userModel";
import { 
  NextApiRequest,
  NextApiResponse } from "next";
import { UserDocument } from "../models/userModel";
import { 
  findUser,
  createUser } from "../service/user.service";
import { 
  clientError,
  validateError } from "../utils/errors";
import { clientSuccess } from "../utils/success";


export const createUserHandler = async(
  req: NextApiRequest,
  res: NextApiResponse
) =>{
  const userBody: UserDocument = { ...req.body };

  try {
    const checkUserExistence = await findUser({ email: userBody.email });

    if ( checkUserExistence ) {
      return clientError(res, 409, "Email already in use.");
    }

    await createUser(userBody);

    return clientSuccess(res, 201, "User account has been created.");
  } catch( error ) {
    return validateError(error, 400, res);
  }
}