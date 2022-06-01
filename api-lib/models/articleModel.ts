import mongoose from "mongoose";
import { WriterDocument } from "./writerModel";


export interface Article {
  title: string,
  content: string,
  image: string,
  likes: number,
  type: string,
  author: WriterDocument["_id"],
  collaborators: WriterDocument["_id"][]
}

export interface ArticleDocument extends Article, mongoose.Document {
  createdAt: Date,
  updatedAt: Date
}

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: [
    {
      type: String,
      required: true
    }
  ],
  image: {
    type: String,
    required: true
  },
  type: {
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

const ArticleModel = mongoose.models?.Article || mongoose.model<ArticleDocument>("Article", articleSchema);

export { ArticleModel };