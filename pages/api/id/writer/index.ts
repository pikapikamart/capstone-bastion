import { createWriterIdHandler } from "@/api-lib/controller/writerId.controller";
import { connectDatabase } from "@/api-lib/db";
import nc from "next-connect";


const handler = nc();

handler.use(connectDatabase);

// Validate admin
handler.post(createWriterIdHandler);

export default handler;