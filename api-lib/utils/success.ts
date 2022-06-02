import { NextApiResponse } from "next";


export const clientSuccess = (
  res: NextApiResponse,
  status: number,
  data: any
) => {
  const success = {
    status,
    data
  };

  return res.status(status).json(success);
}