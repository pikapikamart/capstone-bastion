import { 
  GetStaticPropsContext, 
  InferGetStaticPropsType, 
  NextPage } from "next";
import { HomePage } from "@/page-components/home";
import { 
  ArticlesData, 
  ResultJson } from "@/store/tracked";
import { HTMLHead } from "@/page-components/layout/head";
import { GlobalStyles } from "@/styled/theme";
import { Header } from "@/components/layout/header";


type HomePage<T> = NextPage<T> & {
  getLayout: ( page: React.ReactElement ) => React.ReactNode
}

const Home: HomePage<InferGetStaticPropsType<typeof getStaticProps>> = ( { articles } ) =>{
  
  return (
    <HomePage articles={ articles } />
  )
}

Home.getLayout = ( page: React.ReactElement ) =>{

  return (
    <>
      <HTMLHead />
      <GlobalStyles />
      <Header />
      { page }
    </>
  )
}

export const getStaticProps = async ( context: GetStaticPropsContext ) =>{
  // Fetching becase default controller code checks authentication
  const result = await fetch(process.env.SITE_URL + "/api/articles");
  const jsonresult: ResultJson = await result.json();
  
  return {
    props: {
      articles: jsonresult.data as ArticlesData
    }
  }
}


export default Home;