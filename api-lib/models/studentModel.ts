import mongoose from "mongoose";
import { 
  User,
  userBaseModel, 
  UserDocument} from "./userModel";
import bcrypt from "bcrypt";


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


studentSchema.pre("save", async function(this: StudentDocument, next) {
  if ( !this.isModified("password") ) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;

  return next();
})

studentSchema.methods.comparePassword = async function( password: string ): Promise<boolean> {
  const user = this as StudentDocument;

  try {
    return await bcrypt.compare(password, user.password);
  } catch( error ) {
    return false;
  } 
}

const StudentModel = mongoose.models?.Student || mongoose.model<StudentDocument>("Student", studentSchema);

export { StudentModel };