import { connectDatabase } from "@/api-lib/db";
import { verifyUser } from "@/api-lib/middlewares/verifyUser";
import nc from "next-connect";


const handler = nc();

handler.use(connectDatabase);

handler.get(verifyUser);


export default handler;