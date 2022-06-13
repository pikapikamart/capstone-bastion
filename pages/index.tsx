import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next";
import { HomePage } from "@/page-components/home";
import { ArticlesData, ResultJson } from "@/store/tracked";


const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ( { articles } ) =>{
  
  return (
    <HomePage articles={ articles } />
  )
}

export const getStaticProps = async ( context: GetStaticPropsContext ) =>{
  const result = await fetch(process.env.SITE_URL + "/api/articles");
  const jsonresult: ResultJson = await result.json();
  
  return {
    props: {
      articles: jsonresult.data as ArticlesData
    }
  }
}


export default Home;