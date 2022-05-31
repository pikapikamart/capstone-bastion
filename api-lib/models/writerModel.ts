import mongoose from "mongoose";
import { 
  UserDocument,
  userBaseModel } from "./userModel";
import { ArticleMongooseDocument } from "./articleModel";


export interface WriterDocument extends UserDocument {
  writerId: string,
  image: string,
  writings: ArticleMongooseDocument["_id"][]
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
  },
  image: {
    type: String
  },
  writings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article"
    }
  ]
}, { timestamps: true });


const WriterModel = mongoose.models?.Writer || mongoose.model<WriterMongooseDocument>("Writer", writerSchema);

export { WriterModel };