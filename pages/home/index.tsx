import { 
  NextPage,
  InferGetStaticPropsType, 
  GetServerSidePropsContext} from "next";
import { useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { findArticles } from "@/api-lib/service/articles.service";
import { articlesServiceOptions } from "@/api-lib/controller/options";
import { ArticleData } from "@/store/tracked";
import { connectDatabase } from "@/api-lib/db";
import { HomePage } from "@/page-components/home";


const Home: NextPage<InferGetStaticPropsType<typeof getServerSideProps>> = ( { articles } ) =>{
  const { data } = useSession();
  const router = useRouter();

  useEffect(() =>{
    if ( !data ) {
      router.push("/");
    }
  }, [ data ])

  if ( !data ) {
    return <div></div>
  }

  return (
    <HomePage articles={ articles } />
  );
}

export const getServerSideProps = async( context: GetServerSidePropsContext ) =>{
  await connectDatabase(null, null, null);
  const {
    query,
    projection,
    option,
    populate
    } = articlesServiceOptions.signedIn;

  const foundArticles = await findArticles(query, projection, option, populate);

  const session = await getSession(context);

  return {
    props: {
      articles: (JSON.parse(JSON.stringify(foundArticles)) as ArticleData[]).reverse(),
      session
    }
  }
}


export default Home;