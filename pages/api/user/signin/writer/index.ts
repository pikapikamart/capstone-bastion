import nc from "next-connect";
import { connectDatabase } from "@/api-lib/db";
import { validateRequest } from "@/api-lib/middlewares/validateRequest";
import { signInSchema } from "@/api-lib/schemas/user.schema";
import { findWriterHandler } from "@/api-lib/controller/writer.controller";


const handler = nc();

handler.use(connectDatabase);

// account signin workaround
handler.post(validateRequest(signInSchema), findWriterHandler);

export default handler;