import nc from "next-connect";
import { connectDatabase } from "@/api-lib/db";


const handler = nc();

handler.use(connectDatabase);

// account creation
handler.post()


export default handler;