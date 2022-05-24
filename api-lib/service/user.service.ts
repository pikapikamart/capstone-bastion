import { 
  DocumentDefinition,
  FilterQuery,
  QueryOptions } from "mongoose";
import { 
  WriterDocument,
  WriterModel,
  WriterMongooseDocument } from "../models/writerModel";
import { 
  StudentDocument,
  StudentModel,
  StudentMongooseDocument } from "../models/studentModel";


type User = WriterDocument | StudentDocument;
type UserMongoose = WriterMongooseDocument | StudentMongooseDocument;

const isWriter = ( user: User ) =>{ 
  return user.userType === "writer";
}

export const findUser = async(
  query: FilterQuery<User>,
  options: QueryOptions = { lean: true }
): Promise<UserMongoose | null> =>{
  if ( isWriter(query as unknown as User) ) {
    return WriterModel.findOne(query, options);
  } 

  return StudentModel.findOne(query, options);
}

export const createUser = async(
  userInfo: DocumentDefinition<User>
): Promise<UserMongoose> => {
  if ( isWriter(userInfo as unknown as User) ) {
    return WriterModel.create(userInfo);
  }

  return StudentModel.create(userInfo);
}
