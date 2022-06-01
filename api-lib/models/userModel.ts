import mongoose from "mongoose"

// userType = admin writer student
export interface User {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

export interface UserDocument extends mongoose.Document {
  createdAt: Date,
  updatedAt: Date,
  comparePassword: ( password: string ) => Promise<boolean>
}

export const userBaseModel = {
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