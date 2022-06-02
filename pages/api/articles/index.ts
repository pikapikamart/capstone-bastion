import nc from "next-connect";
import { connectDatabase } from "@/api-lib/db";
import { getArticlesHandler } from "@/api-lib/controller/articles.controller";


const handler = nc();

handler.use(connectDatabase);

// Creating an article
handler.get(getArticlesHandler);

export default handler;