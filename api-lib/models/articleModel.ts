import mongoose from "mongoose";
import { WriterMongooseDocument } from "./writerModel";


export interface ArticleDocument {
  title: string,
  content: string,
  image: string,
  likes: number,
  author: WriterMongooseDocument["_id"],
  collaborators: WriterMongooseDocument["_id"][]
}

export interface ArticleMongooseDocument extends ArticleDocument, mongoose.Document {
  createdAt: Date,
  updatedAt: Date
}

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Writer",
    required: true
  },
  collaborators: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Writer"
    }
  ]
},{ timestamps: true }
);

const ArticleModel = mongoose.models?.Article || mongoose.model<ArticleMongooseDocument>("Article", articleSchema);

export { ArticleModel };