import "@/api-lib/models/articleModel";
import {
  NextApiRequest,
  NextApiResponse
} from "next";
import { validateError } from "../utils/errors";
import { getSession } from "next-auth/react";
import { clientSuccess } from "../utils/success";
import { articlesServiceOptions } from "./options";
import { findArticles } from "../service/articles.service";
import { findSlicedReadings } from "../service/readings.service";


export const findArticlesHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const userSession = await getSession({ req });

    if ( userSession && userSession.user ) {
      const {
        query,
        projection,
        option,
        populate
        } = articlesServiceOptions.signedIn;
      const articles = await findArticles(query, projection, option, populate)
        
      return clientSuccess(res, 200, articles);
    } 

      const {
        projection,
        populate
        } = articlesServiceOptions.signedOut;
      const readings = await findSlicedReadings(projection, populate);

      return clientSuccess(res, 200, readings);
  } catch( error ) {
    return validateError(error, 400, res);
  }
}