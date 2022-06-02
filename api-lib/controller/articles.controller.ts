import "@/api-lib/models/articleModel";
import {
  NextApiRequest,
  NextApiResponse
} from "next";
import { validateError } from "../utils/errors";
import { findArticles } from "../service/articles.service";
import { clientSuccess } from "../utils/success";
import { getSession } from "next-auth/react";
import { findSlicedReadings } from "../service/readings.service";


export const findArticlesHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const userSession = await getSession({ req });

    if ( userSession && userSession.user ) {
      const serviceOptions = {
        query: {},
        projection: "-_id",
        option: {
          limit: 6
        },
        populate: {
          path: "author collaborators",
          select: "-_id -email -password -writerId -writings"
        }
      }
      const articles = await findArticles(
        serviceOptions.query, 
        serviceOptions.projection,
        serviceOptions.option,
        serviceOptions.populate)
        
      return clientSuccess(res, 200, articles);
    } 

    const serviceOptions = {
        projection: {
          readings: { $slice: -3 },
          _id: 0
        },
        populate: {
          path: "readings",
          select: "-_id",
          populate: {
            path: "author collaborators",
            select: "-_id -email -password -writerId -writings"
          }
        }
      }
      const readings = await findSlicedReadings(
        serviceOptions.projection,
        serviceOptions.populate);

      return clientSuccess(res, 200, readings);
    
  } catch( error ) {
    return validateError(error, 400, res);
  }
}