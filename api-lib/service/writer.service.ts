import { 
  DocumentDefinition,
  FilterQuery, 
  PopulateOptions, 
  ProjectionType, 
  QueryOptions, 
  UpdateQuery} from "mongoose";
import { 
  Writer, 
  WriterModel, 
  WriterDocument } from "../models/writerModel";

// Create wrappers
export const findWriter = async (
  query: FilterQuery<Writer>,
  projection: ProjectionType<Writer> = "",
  populate?: PopulateOptions
): Promise<any> => (
  populate? WriterModel.findOne(query, projection).populate(populate) : WriterModel.findOne(query, projection)
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