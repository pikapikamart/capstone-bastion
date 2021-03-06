import nc from "next-connect";
import { connectDatabase } from "@/api-lib/db";
import { findArticlesHandler } from "@/api-lib/controller/articles.controller";


const handler = nc();

handler.use(connectDatabase);

// Creating an article
handler.get(findArticlesHandler);

export default handler;