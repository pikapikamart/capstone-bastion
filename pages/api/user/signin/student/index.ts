import nc from "next-connect";
import { connectDatabase } from "@/api-lib/db";
import { validateRequest } from "@/api-lib/middlewares/validateRequest";
import { signInSchema } from "@/api-lib/schemas/user.schema";
import { signInStudentHandler } from "@/api-lib/controller/student.controller";


const handler = nc();

handler.use(connectDatabase);

// account signin workaround
handler.post(validateRequest(signInSchema), signInStudentHandler);

export default handler;