import nc from "next-connect";
import { connectDatabase } from "@/api-lib/db";
import { validateUserType } from "@/api-lib/middlewares/validateUserType";
import { validateRequest } from "@/api-lib/middlewares/validateRequest";


const handler = nc();

handler.use(connectDatabase);

// account creation
handler.post(validateUserType)


export default handler;