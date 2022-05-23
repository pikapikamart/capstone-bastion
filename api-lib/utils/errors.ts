import { NextApiResponse } from "next";
import { ValidationError } from "yup";


type ClientError = {
  status: number,
  title: string,
  error: string | string[]
}

export const ClientError = ( 
  res: NextApiResponse,
  status: number,
  message: string | string[] = ""
) => {
  const error: ClientError = {
    status,
    title: "",
    error: ""
  }

  switch( status ) {
    case 400:
      error.title = "Bad request.";
      error.error = message?? "Make sure to enter proper data.";
      break;
    case 409:
      error.title = "Conflict.";
      error.error = message;
      break;
    case 500:
      error.title = "Server error.";
      error.error = "Please try again later.";
      break;
  }

  return res.status(status).json(error);
}

export const validateError = (
  error: unknown,
  httpStatus: number,
  res: NextApiResponse
) => {
  if ( error instanceof ValidationError ) {
    return ClientError(res, httpStatus, error.errors)
  }

  if ( error instanceof Error ) {
    return ClientError(res, httpStatus, error.message);
  }

  else {
    return ClientError(res, 500)
  }
}