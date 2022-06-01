import { 
  DocumentDefinition,
  FilterQuery, 
  QueryOptions, 
  UpdateQuery} from "mongoose";
import { 
  Writer, 
  WriterModel, 
  WriterDocument } from "../models/writerModel";


export const findWriter = async (
  query: FilterQuery<Writer>,
  option: QueryOptions = {}
): Promise<WriterDocument | null> => (
  WriterModel.findOne(query, option)
)

export const createWriter = async (
  writerInfo: DocumentDefinition<Writer>
): Promise<WriterDocument> => (
  WriterModel.create(writerInfo)
)

export const updateWriter = async (
  query: FilterQuery<Writer>,
  update: UpdateQuery<Writer>,
  option: QueryOptions = {}
): Promise<WriterDocument | null> => (
  WriterModel.findOneAndUpdate(query, update, option)
)