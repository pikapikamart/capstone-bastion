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
import { getCurrentWriter, sendCloudinaryImage } from "../utils";
import { updateWriter } from "../service/writer.service";
import { 
  createReadings, 
  updateReadings } from "../service/readings.service";
import { customAlphabet } from "nanoid";
import xss from "xss";


export const createArticleHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const nanoid = customAlphabet("1234567890TheBastionGroupOfPublicationsprmsuzw", 14);
  const articleBody: Article = {
    ...req.body,
    searchId: nanoid()
  };

  try {
    const foundArticle = await findArticle({ title: articleBody.title });
    
    if ( foundArticle ) {
      return clientError(res, 409, "Article already created.");
    }

    const currentWriter = await getCurrentWriter(req);

    if ( !currentWriter ) {
      return clientError(res, 401)
    }
    
    articleBody.author = currentWriter._id;
    articleBody.likes = 0;
    articleBody.content = xss(articleBody.content);

    articleBody.image = await sendCloudinaryImage(articleBody.image, "bastion/articles");

    const createdArticle = await createArticle(articleBody);
    
    const writerUpdate = {
      query: {
        writerId: currentWriter.writerId
      },
      update: {
        $push: { 
          writings: createdArticle._id 
        }
      }
    }

    await updateWriter(writerUpdate.query, writerUpdate.update);

    const readingsUpdate = {
      query: {
        genre: createdArticle.type
      },
      update: {
        $push: {
          readings: createdArticle._id
        }
      }
    }

    const updatedReadings = await updateReadings(readingsUpdate.query, readingsUpdate.update);

    if ( !updatedReadings ) {
      const readingsBody = {
        genre: createdArticle.type,
        readings: [ createdArticle._id ]
      }

      await createReadings(readingsBody);
    }

    return clientSuccess(res, 201, "Your article has been successfully published.");

  } catch( error ) {
    return validateError(error, 400, res)
  }
}

export const findArticleHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) =>{
  const searchId = req.query["searchId"];
  
  try {
    const serviceOptions = {
      query: {
        searchId
      },
      projection: "-_id",
      populate: {
        path: "author collaborators",
        select: "-_id -email -password -writerId"
      }
    }
    const foundArticle = await findArticle(
      serviceOptions.query,
      serviceOptions.projection,
      serviceOptions.populate
    );

    if ( !foundArticle ) {
      return clientError(res, 404);
    }

    return clientSuccess(res, 200, foundArticle);
  } catch( error ) {
    return validateError(error, 400, res)
  }
}