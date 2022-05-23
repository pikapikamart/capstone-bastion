import nc from "next-connect";
import { connectDatabase } from "@/api-lib/db";
import { validateUserType } from "@/api-lib/middlewares/validateUserType";
import { validateRequest } from "@/api-lib/middlewares/validateRequest";
import { userCreateSchema } from "@/api-lib/schemas/user.schema";
import { createUserHandler } from "@/api-lib/controller/user.controller";


const handler = nc();

handler.use(connectDatabase);

// account creation
handler.post(validateUserType, validateRequest(userCreateSchema), createUserHandler);


export default handler;