import mongoose from "mongoose";
import { 
  User,
  userBaseModel, 
  UserDocument} from "./userModel";
import { 
  preHashModel,
  modelComparePassword } from "./utils";


export interface Student extends User {
  studentId: string
}

export interface StudentDocument extends Student, UserDocument {}

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

studentSchema.pre("save", preHashModel);

studentSchema.methods.comparePassword = async function( password: string ) {
  return modelComparePassword(this as StudentDocument, password);
}

const StudentModel = mongoose.models?.Student || mongoose.model<StudentDocument>("Student", studentSchema);

export { StudentModel };