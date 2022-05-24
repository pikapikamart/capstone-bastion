import "@/api-lib/models/studentModel";
import "@/api-lib/models/writerModel";
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
    const checkUserExistence = await findUser({
      userType: userBody.userType,
      email: userBody.email
    });

    if ( checkUserExistence ) {
      return clientError(res, 409, "Email already in use.");
    }

    await createUser(userBody);

    return clientSuccess(res, 201, "User account has been created.");
  } catch( error ) {
    return validateError(error, 400, res);
  }
}

export const findUserHandler = async(
  req: NextApiRequest,
  res: NextApiResponse
) =>{
  const userBody: Partial<UserDocument> = { ...JSON.parse(req.body) };
  
  try {
    const checkUserExistence = await findUser({
      userType: userBody.userType,
      email: userBody.email,
      password: userBody.password
    })

    if ( !checkUserExistence ) {
      return clientError(res, 404, "User account not found.")
    }

    return clientSuccess(res, 200, "User validation success.");
  } catch( error ) {
    console.log("controller error");
    return validateError(error, 400, res);
  }
}