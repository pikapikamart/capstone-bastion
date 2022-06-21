import { 
  NextApiRequest, 
  NextApiResponse } from "next";
import { customAlphabet } from "nanoid";
import { createWriterId } from "../service/writerId.service";
import { clientSuccess } from "../utils/success";
import { validateError } from "../utils/errors";


export const createWriterIdHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const nanoid = customAlphabet("1234567890Journalistofthebastiongroupofpublications", 14);
    await createWriterId({
      status: "available",
      id: nanoid()
    })

    return clientSuccess(res, 201, "Writer ID has been created.");
  } catch( error ) {
    return validateError(error, 400, res);
  }
}