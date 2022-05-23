import { 
  NextApiRequest,
  NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import { AnySchema } from "yup";
import { validateError } from "../utils/errors";


export const validateRequest = ( schema: AnySchema ) => async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
)  =>{
  try { 
    const options = { abortEarly: false };
    await schema.validate({ body: req.body }, options);

    return next();
  } catch( error ) {
    return validateError(error, 400, res);
  }
}