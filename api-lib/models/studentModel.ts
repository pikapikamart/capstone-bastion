import mongoose from "mongoose";
import { 
  UserDocument,
  userBaseModel } from "./userModel";


export interface StudentDocument extends UserDocument {
  studentId: string
}

export interface StudentMongooseDocument extends StudentDocument, mongoose.Document {
  createdAt: Date,
  updatedAt: Date
}

const studentSchema = new mongoose.Schema({
  ...userBaseModel,
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article"
    }
  ]
}, { timestamps: true });


const StudentModel = mongoose.models?.Student || mongoose.model<StudentMongooseDocument>("Student", studentSchema);

export { StudentModel };