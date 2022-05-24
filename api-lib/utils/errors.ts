import { NextApiResponse } from "next";
import { ValidationError } from "yup";


type ClientError = {
  status: number,
  title: string,
  error: string | string[]
}

export const clientError = ( 
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
    case 401:
      error.title = "Unauthorized.";
      error.error = "Make to sure to be logged in first.";
      break;
    case 404:
      error.title = "Not found.";
      error.error = message?? "Request data not found.";
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
    return clientError(res, httpStatus, error.errors)
  }

  if ( error instanceof Error ) {
    return clientError(res, httpStatus, error.message);
  }

  else {
    return clientError(res, 500)
  }
}