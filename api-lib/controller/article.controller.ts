import "@/api-lib/models/articleModel";
import {
  NextApiRequest,
  NextApiResponse
} from "next";
import { ArticleDocument } from "@/api-lib/models/articleModel";
import {
  clientError, 
  validateError } from "../utils/errors";
import { clientSuccess } from "../utils/success";
import { 
  findArticle,
  createArticle } from "../service/article.service";
import { getCurrentUser } from "../utils";
import { updateWriterUser } from "../service/user.service";



export const createArticleHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // use a image string returned by filereader
  // send to cloudinary
  const articleBody: ArticleDocument = { ...req.body };

  try {
    const checkArticleExistence = await findArticle({ title: articleBody.title });

    if ( checkArticleExistence ) {
      return clientError(res, 409, "Article already created.");
    }

    const currentUser = await getCurrentUser();

    if ( !currentUser ) {
      return clientError(res, 401)
    }
    
    articleBody.author = currentUser._id;
    articleBody.likes = 0;

    await createArticle(articleBody);
    
    const userUpdateOptions = {
      query: {
        writerId: "test"
      },
      update: {
        
      }
    }

  } catch( error ) {
    return validateError(error, 400, res)
  }
}