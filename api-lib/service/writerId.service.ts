import { 
  DocumentDefinition, 
  FilterQuery } from "mongoose";
import { WriterId, WriterIdModel } from "../models/writerIdModel";
import { Writer } from "../models/writerModel";


export const createWriterId = async(
  idInfo: DocumentDefinition<WriterId>
): Promise<Writer | null> => (
  WriterIdModel.create(idInfo)
)

export const findWriterId = async(
  query: FilterQuery<WriterId>
): Promise<WriterId | null> => (
  WriterIdModel.findOne(query)
)