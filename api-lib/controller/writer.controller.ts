import { 
  NextApiRequest,
  NextApiResponse } from "next";
import { Writer } from "@/api-lib/models/writerModel";
import { 
  clientError,
  validateError } from "../utils/errors";
import { clientSuccess } from "../utils/success";
import { 
  createWriter, 
  findWriter, 
  updateWriter} from "../service/writer.service";
import { writerServiceOptions } from "./options";
import { 
  findWriterId, 
  updateWriterId } from "../service/writerId.service";
import { deleteCloudinaryImage, getCurrentWriter, sendCloudinaryImage } from "../utils";


export const createWriterHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) =>{
  const writerBody: Writer = req.body;
  writerBody.username = writerBody.email.split("@")[0];

  try {
    const foundWriter = await findWriter({ email: writerBody.email });

    if ( foundWriter ) {
      return clientError(res, 409, "Email already in use.");
    }

    const availableId = await findWriterId({ id: writerBody.writerId });

    if ( !availableId ) {
      return clientError(res, 404, "No writer ID found.");
    }

    if ( availableId.status==="used" ) {
      return clientError(res, 409, "Writer ID is already used.");
    }

    await createWriter(writerBody);
    await updateWriterId({ id: writerBody.writerId });

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
    const foundWriter = await findWriter({ email: writerBody.email });

    if ( !foundWriter ) {
      return clientError(res, 404, "User account not found.")
    }

    const isOwned = await foundWriter.comparePassword(writerBody.password);
    
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
  const username = req.query["username"];
  
  try {
    const serviceOptions = {
      ...writerServiceOptions,
      query: {
        username
      }
    }

    const foundWriter = await findWriter(
      serviceOptions.query,
      serviceOptions.projection,
      serviceOptions.populate
    );

    if ( !foundWriter ) {
      return clientError(res, 404, "User account not found.")
    }
  
    return clientSuccess(res, 200, foundWriter);
  } catch( error ) {
    return validateError(error, 400, res);
  }
}

export const updateWriterHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const writerBody: Writer = req.body;
  
  try {
    const currentWriter = await getCurrentWriter(req);

    if ( !currentWriter ) {
      return clientError(res, 401);
    }

    if ( writerBody.image && currentWriter.image ) {
      await deleteCloudinaryImage("bastion/writers/", currentWriter.image);
    } 
    
    writerBody.image = await sendCloudinaryImage(writerBody.image, "bastion/writers");
    
    await updateWriter({ email: currentWriter.email}, writerBody);

    return clientSuccess(res, 200, "Account successfully updated.");
  } catch(error) {
    return validateError(error, 400, res);
  }
}