import { 
  DocumentDefinition,
  FilterQuery, 
  QueryOptions, 
  UpdateQuery} from "mongoose";
import { 
  StudentDocument, 
  StudentModel, 
  StudentMongooseDocument } from "../models/studentModel";


export const findStudent = async (
  query: FilterQuery<StudentDocument>,
  option: QueryOptions = { lean: true }
): Promise<StudentMongooseDocument | null> => (
  StudentModel.findOne(query, option)
)

export const createStudent = async (
  studentInfo: DocumentDefinition<StudentDocument>
): Promise<StudentMongooseDocument> => (
  StudentModel.create(studentInfo)
)

export const updateStudent = async (
  query: FilterQuery<StudentDocument>,
  update: UpdateQuery<StudentDocument>,
  option: QueryOptions = {  }
): Promise<StudentMongooseDocument | null> => (
  StudentModel.findOneAndUpdate(query, update, option)
)