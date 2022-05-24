import { 
  NextApiRequest,
  NextApiResponse
} from "next";
import { NextHandler } from "next-connect";
import { 
  writerCreateSchema,
  studentCreateSchema } from "../schemas/user.schema";
import { UserDocument } from "../models/userModel";
import { validateError } from "../utils/errors";


export const validateUserType = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {

  try {
    const requestBody: UserDocument = { ...JSON.parse(req.body) };
    const options = { abortEarly: false };

    if ( requestBody.userType === "writer" ) {
      await writerCreateSchema.validate({ body: requestBody }, options);
    }

    else if ( requestBody.userType === "student" ) {
      await studentCreateSchema.validate({ body: requestBody }, options);
    }

    return next();
  } catch( error ) {
    return validateError(error, 400, res);
  }
}