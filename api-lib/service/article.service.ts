import { 
  DocumentDefinition,
  FilterQuery,
  PopulateOptions,
  ProjectionType,
  QueryOptions } from "mongoose";
import { 
  ArticleModel,
  Article,
  ArticleDocument } from "../models/articleModel";


export const findArticle = async (
  query: FilterQuery<Article>,
  projection: ProjectionType<Article> = "",
  populate?: PopulateOptions
): Promise<ArticleDocument | null> => {

  const find = async () => (
    populate? ArticleModel.findOne(query, projection).populate(populate) : ArticleModel.findOne(query, projection) 
  )

  return find();
}

export const createArticle = async(
  articleInfo: DocumentDefinition<Article>
): Promise<ArticleDocument> => (
  ArticleModel.create(articleInfo)
)