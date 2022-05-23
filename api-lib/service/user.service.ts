import { 
  DocumentDefinition,
  FilterQuery,
  QueryOptions } from "mongoose";
import { 
  UserModel,
  UserDocument } from "../models/userModel";


export const findUser = async(
  query: FilterQuery<UserDocument>,
  options: QueryOptions = { lean: true }
) => (
  UserModel.findOne(query, options)
)

export const createUser = async(
  userInfo: DocumentDefinition<UserDocument>
) => (
  UserModel.create(userInfo)
)