import nc from "next-connect";
import { connectDatabase } from "@/api-lib/db";
import { validateRequest } from "@/api-lib/middlewares/validateRequest";
import { writerCreateSchema } from "@/api-lib/schemas/user.schema";
import { createWriterHandler } from "@/api-lib/controller/writer.controller";


const handler = nc();

handler.use(connectDatabase);

// account creation
handler.post(validateRequest(writerCreateSchema), createWriterHandler);

export default handler;