import mongoose from "mongoose";


// userType = admin writer student
export interface UserDocument {
  userType: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

export interface UserMongooseDocument<T> extends UserDocument, mongoose.Document {
  
}

export const userBaseModel = {
  userType: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}