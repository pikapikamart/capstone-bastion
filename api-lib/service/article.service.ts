import { 
  DocumentDefinition,
  FilterQuery,
  QueryOptions } from "mongoose";
import { 
  ArticleModel,
  ArticleDocument,
  ArticleMongooseDocument } from "../models/articleModel";


export const findArticle = async (
  query: FilterQuery<ArticleDocument>,
  option: QueryOptions = { lean: true }
): Promise<ArticleMongooseDocument | null>  => (
  ArticleModel.findOne(query, option)
)

export const createArticle = async(
  articleInfo: DocumentDefinition<ArticleDocument>
): Promise<ArticleMongooseDocument> => (
  ArticleModel.create(articleInfo)
)