import { 
  DocumentDefinition,
  FilterQuery,
  QueryOptions } from "mongoose";
import { 
  ArticleModel,
  Article,
  ArticleDocument } from "../models/articleModel";


export const findArticle = async (
  query: FilterQuery<Article>,
  option: QueryOptions = {}
): Promise<ArticleDocument | null>  => (
  ArticleModel.findOne(query, option)
)

export const createArticle = async(
  articleInfo: DocumentDefinition<Article>
): Promise<ArticleDocument> => (
  ArticleModel.create(articleInfo)
)