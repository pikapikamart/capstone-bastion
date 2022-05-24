import mongoose from "mongoose";
import { 
  UserDocument,
  userBaseModel } from "./userModel";


export interface WriterDocument extends UserDocument {
  writerId: string
}

export interface WriterMongooseDocument extends WriterDocument, mongoose.Document {
  createdAt: Date,
  updatedAt: Date
}

const writerSchema = new mongoose.Schema({
  ...userBaseModel,
  writerId: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });


const WriterModel = mongoose.models?.Writer || mongoose.model<WriterMongooseDocument>("Writer", writerSchema);

export { WriterModel };