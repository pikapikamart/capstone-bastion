import { 
  NextApiRequest,
  NextApiResponse } from "next";
import { 
  clientError,
  validateError } from "../utils/errors";
import { clientSuccess } from "../utils/success";
import { Student } from "@/api-lib/models/studentModel";
import { createStudent, findStudent } from "../service/student.service";
import { nanoid } from "nanoid";


export const createStudentHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) =>{
  const studentBody: Student = {
    ...req.body,
    searchId: nanoid()
  };

  try {
    const foundStudent = await findStudent({ email: studentBody.email });

    if ( foundStudent ) {
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
    const foundStudent = await findStudent({ email: studentBody.email });

    if ( !foundStudent ) {
      return clientError(res, 404, "User account not found.")
    }

    const isOwned = await foundStudent.comparePassword(studentBody.password);

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
    const foundStudent = await findStudent({ email: studentBody.email });

    if ( !foundStudent ) {
      return clientError(res, 404, "User account not found.")
    }

    return clientSuccess(res, 200, "User validation success.");
  } catch( error ) {
    console.log("controller error");
    return validateError(error, 400, res);
  }
}