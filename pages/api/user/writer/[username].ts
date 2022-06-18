import nc from "next-connect";
import { connectDatabase } from "@/api-lib/db";
import { findWriterHandler } from "@/api-lib/controller/writer.controller";


const handler = nc();

handler.use(connectDatabase);

handler.get(findWriterHandler);

export default handler;