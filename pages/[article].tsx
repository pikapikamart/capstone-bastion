import { connectDatabase } from "@/api-lib/db";
import { findArticle } from "@/api-lib/service/article.service";
import { findAllArticles } from "@/api-lib/service/articles.service";
import { sanitizeArticleLink } from "@/lib/utils";
import { ArticlePage } from "@/page-components/article";
import { ArticleData } from "@/store/tracked";
import { 
  GetStaticPaths, 
  GetStaticPropsContext, 
  InferGetStaticPropsType, 
  NextPage } from "next";
import { ParsedUrlQuery } from "querystring";


const Article: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ( { article } ) => {

  return (
    <ArticlePage article={ article } />
  );
}

export default Article;

interface Params {
  params: {
    article: string
  }
}

export const getStaticPaths: GetStaticPaths = async () =>{
  await connectDatabase();
  const articles = await findAllArticles("-_id -content -image -type -author -collaborators -likes");
  const articleParams = articles?.reduce((acc: Params[], cur) =>{
    acc.push({
      params: {
        article: `${ sanitizeArticleLink(cur.title) }-${ cur.searchId }` 
      }
    })

    return acc;
  }, [])

  return {
    paths: articleParams ?? [{ params: { article: "hi" } }],
    fallback: false
  }
}

interface ArticleParams extends ParsedUrlQuery {
  article: string
}

export const getStaticProps = async( context: GetStaticPropsContext ) =>{
  await connectDatabase();
  const { article } = context.params as ArticleParams;
  const searchId = article.split("-").slice(-1)[0];
  const serviceOptions = {
    query: {
      searchId
    },
    projection: "-_id",
    populate: {
      path: "author collaborators",
      select: "-_id -email -password -writerId -writings"
    }
  }
  const foundArticle = await findArticle(
    serviceOptions.query,
    serviceOptions.projection,
    serviceOptions.populate
  );

  return {
    props: {
      article: JSON.parse(JSON.stringify(foundArticle)) as ArticleData
    }
  }
}