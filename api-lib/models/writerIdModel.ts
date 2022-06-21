import mongoose from "mongoose";


export interface WriterId {
  status: "available" | "used",
  id: string
}

const writerIdSchema: mongoose.Schema<WriterId> = new mongoose.Schema({
  status: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true,
    unique: true
  }
});

const WriterIdModel = mongoose.models?.WriterId || mongoose.model<WriterId>("WriterId", writerIdSchema);

export { WriterIdModel };