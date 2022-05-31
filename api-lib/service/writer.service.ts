import { 
  DocumentDefinition,
  FilterQuery, 
  QueryOptions } from "mongoose";
import { 
  WriterDocument, 
  WriterModel, 
  WriterMongooseDocument } from "../models/writerModel";


export const findWriter = async (
  query: FilterQuery<WriterDocument>,
  option: QueryOptions = { lean: true }
): Promise<WriterMongooseDocument | null> => (
  WriterModel.findOne(query, option)
)

export const createWriter = async (
  writerInfo: DocumentDefinition<WriterDocument>
): Promise<WriterMongooseDocument> => (
  WriterModel.create(writerInfo)
)