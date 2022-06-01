import "@/api-lib/models/writerModel";
import { 
  NextApiRequest,
  NextApiResponse } from "next";
import { Writer } from "@/api-lib/models/writerModel";
import { 
  clientError,
  validateError } from "../utils/errors";
import { clientSuccess } from "../utils/success";
import { createWriter, findWriter } from "../service/writer.service";


export const createWriterHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) =>{
  const writerBody: Writer = req.body;

  try {
    const writerExistence = await findWriter({ email: writerBody.email });

    if ( writerExistence ) {
      return clientError(res, 409, "Email already in use.");
    }

    await createWriter(writerBody);

    return clientSuccess(res, 201, "User account has been created.");
  } catch( error ) {
    return validateError(error, 400, res);
  }
}

export const signInWriterhandler = async(
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const writerBody: Writer = JSON.parse(req.body);

  try {
    const writerExistence = await findWriter({ email: writerBody.email });

    if ( !writerExistence ) {
      return clientError(res, 404, "User account not found.")
    }

    const isOwned = await writerExistence.comparePassword(writerBody.password);

    if ( isOwned ) {
      return clientSuccess(res, 201, "User successfuly authenticated.");
    } else {
      return clientError(res, 401);
    }
  } catch( error ) {
    return validateError(error, 400, res);
  }
}

export const findWriterHandler = async(
  req: NextApiRequest,
  res: NextApiResponse
) =>{
  const writerBody: Writer = JSON.parse(req.body);
  
  try {
    const writerExistence = await findWriter({ email: writerBody.email });

    if ( !writerExistence ) {
      return clientError(res, 404, "User account not found.")
    }

    return clientSuccess(res, 200, "User validation success.");
  } catch( error ) {
    console.log("controller error");
    return validateError(error, 400, res);
  }
}