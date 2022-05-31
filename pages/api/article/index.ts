import nc from "next-connect";
import { connectDatabase } from "@/api-lib/db";
import { verifyUser } from "@/api-lib/middlewares/verifyUser";
import { validateRequest } from "@/api-lib/middlewares/validateRequest";
import { articleCreateSchema } from "@/api-lib/schemas/article.schema";
import { createArticleHandler } from "@/api-lib/controller/article.controller";


const handler = nc();

handler.use(connectDatabase);

// Creating an article
handler.post(verifyUser, validateRequest(articleCreateSchema), createArticleHandler);

export default handler;