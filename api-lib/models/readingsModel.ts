import mongoose from "mongoose";


const readingsTopic = "Education News Updates Sports Entertainments Education".split(" ");

type ReadingsRef = {
  type: typeof mongoose.Schema.Types.ObjectId,
  ref: "Article"
}

type MappedReadingsTopic = {
  [key: string]: ReadingsRef[]
}

const mapReadingsTopic = () =>{
  const mappedReadings: MappedReadingsTopic = {};

  readingsTopic.forEach(topic =>{
    mappedReadings[topic] = [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article"
    }]
  });

  return mappedReadings;
}

const readingsSchema = new mongoose.Schema({
  education: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article"
  }],
  news: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article"
  }],
  updates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article"
  }],
  sports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article"
  }],
  entertainments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article"
  }],
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article"
  }],
})