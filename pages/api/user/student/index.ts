import nc from "next-connect";
import { connectDatabase } from "@/api-lib/db";
import { validateRequest } from "@/api-lib/middlewares/validateRequest";
import { studentCreateSchema } from "@/api-lib/schemas/user.schema";
import { createStudentHandler } from "@/api-lib/controller/student.controller";


const handler = nc();

handler.use(connectDatabase);

// account creation
handler.post(validateRequest(studentCreateSchema), createStudentHandler);

export default handler;