import "@/api-lib/models/studentModel";
import { 
  NextApiRequest,
  NextApiResponse } from "next";
import { Writer } from "@/api-lib/models/writerModel";
import { 
  clientError,
  validateError } from "../utils/errors";
import { clientSuccess } from "../utils/success";
import { createWriter, findWriter } from "../service/writer.service";
import { Student } from "@/api-lib/models/studentModel";
import { createStudent, findStudent } from "../service/student.service";


export const createStudentHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) =>{
  const studentBody: Student = req.body;

  try {
    const studentExistence = await findStudent({ email: studentBody.email });

    if ( studentExistence ) {
      return clientError(res, 409, "Email already in use.");
    }

    await createStudent(studentBody);

    return clientSuccess(res, 201, "User account has been created.");
  } catch( error ) {
    return validateError(error, 400, res);
  }
}

export const signInStudentHandler = async(
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const studentBody: Student = JSON.parse(req.body);
  
  try {
    const studentExistence = await findStudent({ email: studentBody.email });

    if ( !studentExistence ) {
      return clientError(res, 404, "User account not found.")
    }

    const isOwned = await studentExistence.comparePassword(studentBody.password);

    if ( isOwned ) {
      return clientSuccess(res, 201, "User successfuly authenticated.");
    } else {
      return clientError(res, 401);
    }
  } catch( error ) {
    return validateError(error, 400, res);
  }
}

export const findStudentHandler = async(
  req: NextApiRequest,
  res: NextApiResponse
) =>{
  const studentBody: Student = JSON.parse(req.body);
  
  try {
    const studentExistence = await findStudent({ email: studentBody.email });

    if ( !studentExistence ) {
      return clientError(res, 404, "User account not found.")
    }

    return clientSuccess(res, 200, "User validation success.");
  } catch( error ) {
    console.log("controller error");
    return validateError(error, 400, res);
  }
}