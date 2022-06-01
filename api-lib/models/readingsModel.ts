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


/*
new mongoose.Schema({
  genre: {
    type: String,
    required: true,
    unique: true
  },
  collection: [
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article"
  ]
})

schema.findOneAndUpdate({genre: News}, { $push: { collection: ObjectId("Article")} });

if ( there are no schema with type of genre ) {
  schema.create({
    genre: News
  })
}


schema.findOneAndUpdate({genre: News}, {$push: {collection: ObjectId("Article")}})



schema.updateOne({})
*/