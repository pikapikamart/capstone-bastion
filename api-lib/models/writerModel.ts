import mongoose from "mongoose";
import { 
  User,
  userBaseModel, 
  UserDocument} from "./userModel";
import { ArticleDocument } from "./articleModel";
import "./articleModel";
import "../utils";
import { 
  preHashModel, 
  modelComparePassword } from "./utils";

  
export interface Writer extends User {
  writerId: string,
  image: string,
  bio?: string,
  writings: ArticleDocument["_id"][],
  collaborations: ArticleDocument["_id"][],
  likes: ArticleDocument["_id"][],
  followings: WriterDocument["_id"][]
}

export interface WriterDocument extends Writer, UserDocument {}

const writerSchema: mongoose.Schema<WriterDocument> = new mongoose.Schema({
  ...userBaseModel,
  writerId: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String
  },
  bio: {
    type: String
  },
  writings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article"
    }
  ],
  collaborations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article"
    }
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article"
    }
  ],
  followings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Writer"
    }
  ]
}, { timestamps: true });

writerSchema.pre("save", preHashModel);

writerSchema.methods.comparePassword = async function( password: string ) {
  return await modelComparePassword(this as WriterDocument, password);
}

const WriterModel = mongoose.models?.Writer || mongoose.model<WriterDocument>("Writer", writerSchema);

export { WriterModel };