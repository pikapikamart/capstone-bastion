import { NextApiResponse } from "next";


export const clientSuccess = (
  res: NextApiResponse,
  status: number,
  message: string
) => {
  const success = {
    status,
    message
  };

  return res.status(status).json(success);
}