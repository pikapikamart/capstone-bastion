import mongoose from "mongoose";


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