import { 
  DocumentDefinition,
  FilterQuery, 
  QueryOptions, 
  UpdateQuery} from "mongoose";
import { 
  Student, 
  StudentModel, 
  StudentDocument } from "../models/studentModel";


export const findStudent = async (
  query: FilterQuery<Student>,
  option: QueryOptions = { lean: true }
): Promise<StudentDocument | null> => (
  StudentModel.findOne(query, option)
)

export const createStudent = async (
  studentInfo: DocumentDefinition<Student>
): Promise<StudentDocument> => (
  StudentModel.create(studentInfo)
)

export const updateStudent = async (
  query: FilterQuery<Student>,
  update: UpdateQuery<Student>,
  option: QueryOptions = {  }
): Promise<StudentDocument | null> => (
  StudentModel.findOneAndUpdate(query, update, option)
)