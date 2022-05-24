import nc from "next-connect";
import { connectDatabase } from "@/api-lib/db";
import { verifyUser } from "@/api-lib/middlewares/verifyUser";


const handler = nc();

handler.use(connectDatabase);

// Creating an article
handler.post(verifyUser);

export default handler;