import mongoose from "mongoose";
import { WriterDocument } from "../models/writerModel";
import { StudentDocument } from "../models/studentModel";
import bcrypt from "bcrypt";


type Model = WriterDocument | StudentDocument

export const preHashModel = async function(
  this: Model, 
  next: mongoose.CallbackWithoutResultAndOptionalError
) {
  if ( !this.isModified("password") ) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;

  return next();
}

export const modelComparePassword = async (
  model: Model,
  password: string
): Promise<boolean> => {
  
  try {
    return await bcrypt.compare(password, model.password);
  } catch( error ) {
    return false;
  } 
}