import nc from "next-connect";
import { connectDatabase } from "@/api-lib/db";
import { findArticleHandler } from "@/api-lib/controller/article.controller";


const handler = nc();

handler.use(connectDatabase);

handler.get(findArticleHandler)

export default handler;