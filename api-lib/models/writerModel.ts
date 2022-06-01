import mongoose from "mongoose";
import { 
  User,
  userBaseModel, 
  UserDocument} from "./userModel";
import { ArticleDocument } from "./articleModel";
import bcrypt from "bcrypt";


export interface Writer extends User {
  writerId: string,
  image: string,
  writings: ArticleDocument["_id"][]
}

export interface WriterDocument extends Writer, UserDocument {}

const writerSchema: mongoose.Schema<WriterDocument> = new mongoose.Schema({
  ...userBaseModel,
  writerId: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String
  },
  writings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article"
    }
  ]
}, { timestamps: true });

writerSchema.pre("save", async function(this: WriterDocument, next) {
  if ( !this.isModified("password") ) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;

  return next();
})

writerSchema.methods.comparePassword = async function( password: string ): Promise<boolean> {
  const user = this as WriterDocument;

  try {
    return await bcrypt.compare(password, user.password);
  } catch( error ) {
    return false;
  } 
}

const WriterModel = mongoose.models?.Writer || mongoose.model<WriterDocument>("Writer", writerSchema);

export { WriterModel };