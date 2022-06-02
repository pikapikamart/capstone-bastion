import { 
  FilterQuery,
  PopulateOptions,
  QueryOptions } from "mongoose";
import { 
  ArticleModel,
  Article,
  ArticleDocument } from "../models/articleModel";


export const findArticles = async (
  query: FilterQuery<Article>,
  projection: string,
  option: QueryOptions = {},
  population: PopulateOptions
): Promise<ArticleDocument[] | null> => (
  ArticleModel.find(query, projection, option).populate(population)
)