import "@/api-lib/models/articleModel";
import "@/api-lib/models/writerModel";
import { 
  FilterQuery,
  UpdateQuery,
  DocumentDefinition, 
  QueryOptions} from "mongoose";
import { 
  Readings,
  ReadingsDocument,
  ReadingsModel } from "../models/readingsModel";


export const updateReadings = async (
  query: FilterQuery<Readings>,
  update: UpdateQuery<Readings>,
  option: QueryOptions = {}
): Promise<ReadingsDocument | null> => (
  ReadingsModel.findOneAndUpdate(query, update, option)
)

export const createReadings = async (
  readingInfo: DocumentDefinition<Readings>
): Promise<ReadingsDocument> =>(
  ReadingsModel.create(readingInfo)
)

export const findSlicedReadings = async (
  projection: any,
  population: any
): Promise<ReadingsDocument[] | null> => (
  ReadingsModel.find({}, projection).populate(population)
)