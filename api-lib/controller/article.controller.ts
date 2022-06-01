import "@/api-lib/models/articleModel";
import {
  NextApiRequest,
  NextApiResponse
} from "next";
import { Article } from "@/api-lib/models/articleModel";
import {
  clientError, 
  validateError } from "../utils/errors";
import { clientSuccess } from "../utils/success";
import { 
  findArticle,
  createArticle } from "../service/article.service";
import { getCurrentWriter } from "../utils";
import { updateWriter } from "../service/writer.service";


export const createArticleHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // use a image string returned by filereader
  // send to cloudinary
  const articleBody: Article = req.body;

  try {
    const checkArticleExistence = await findArticle({ title: articleBody.title });

    if ( checkArticleExistence ) {
      return clientError(res, 409, "Article already created.");
    }

    const currentWriter = await getCurrentWriter(req);

    if ( !currentWriter ) {
      return clientError(res, 401)
    }
    
    articleBody.author = currentWriter._id;
    articleBody.likes = 0;

    const createdArticle = await createArticle(articleBody);
    
    const updateOptions = {
      query: {
        writerId: currentWriter.writerId
      },
      update: {
        $push: { writings: createdArticle._id }
      }
    }

    await updateWriter(updateOptions.query, updateOptions.update);

    return clientSuccess(res, 200, "Article creation successful.");

  } catch( error ) {
    return validateError(error, 400, res)
  }
}