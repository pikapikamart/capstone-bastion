

import { 
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