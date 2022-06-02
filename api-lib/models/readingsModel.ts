import mongoose from "mongoose";
import { ArticleDocument } from "./articleModel";


export interface Readings {
  genre: string,
  readings: ArticleDocument["_id"][]
}

export interface ReadingsDocument extends Readings, mongoose.Document {}

const readingSchema: mongoose.Schema<ReadingsDocument> = new mongoose.Schema({
  genre: {
    type: String,
    required: true,
    unique: true
  },
  readings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article"
    }
  ]
})

const ReadingsModel = mongoose.models?.Readings || mongoose.model<ReadingsDocument>("Readings", readingSchema);

export { ReadingsModel };