import nc from "next-connect";
import { connectDatabase } from "@/api-lib/db";
import { validateRequest } from "@/api-lib/middlewares/validateRequest";
import { writerCreateSchema, writerUpdateSchema } from "@/api-lib/schemas/user.schema";
import { createWriterHandler, updateWriterHandler } from "@/api-lib/controller/writer.controller";
import { verifyUser } from "@/api-lib/middlewares/verifyUser";


const handler = nc();

handler.use(connectDatabase);

// account creation
handler.post(validateRequest(writerCreateSchema), createWriterHandler);

// account update
handler.patch(verifyUser, validateRequest(writerUpdateSchema), updateWriterHandler);

export default handler;