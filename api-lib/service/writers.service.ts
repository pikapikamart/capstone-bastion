import { 
  WriterDocument, 
  WriterModel } from "../models/writerModel";


export const findAllWriters = async (
  projection: string
): Promise<WriterDocument[] | null> => (
  WriterModel.find({}, projection)
)
