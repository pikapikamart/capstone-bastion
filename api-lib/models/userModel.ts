import mongoose, { mongo } from "mongoose";


// userType = admin writer student
export interface UserDocument {
  userType: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  writerId?: string,
  studentId?: string
}

export interface UserMongooseDocument extends UserDocument, mongoose.Document {
  createdAt: Date,
  updatedAt: Date
}

const userSchema = new mongoose.Schema({
  userType: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  writerId: {
    type: String,
  },
  studentId: {
    type: String
  }
}, { timestamps: true }
)

const UserModel = mongoose.models?.User || mongoose.model<UserMongooseDocument>("User", userSchema);

export { UserModel };