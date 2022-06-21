import { 
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage } from "next";
import { 
  getSession, 
  useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { RootPage } from "@/page-components/root";
import { DividedArticles } from "@/store/tracked";
import { HTMLHead } from "@/page-components/layout/head";
import { GlobalStyles } from "@/styled/theme";
import { Header } from "@/components/layout/header";
import { connectDatabase } from "@/api-lib/db";
import { articlesServiceOptions } from "@/api-lib/controller/options";
import { findSlicedReadings } from "@/api-lib/service/readings.service";
  

type RootPageT<T> = NextPage<T> & {
  getLayout: ( page: React.ReactElement ) => React.ReactNode
}

const Root: RootPageT<InferGetServerSidePropsType<typeof getServerSideProps>> = ( { articles } ) =>{
  const { data } = useSession();
  const router = useRouter();

  useEffect(() =>{
    if ( data ) {
      router.push("/home");
    }
  }, [])

  if ( data ) {
    return (
      <div></div>
    )
  }

  return (
    <RootPage articles={ articles } />
  )
}

Root.getLayout = ( page: React.ReactElement ) =>{

  return (
    <>
      <HTMLHead />
      <GlobalStyles />
      <Header />
      { page }
    </>
  )
}

export const getServerSideProps = async ( context: GetServerSidePropsContext ) =>{
  await connectDatabase(null, null, null);
  const {
    projection,
    populate
  } = articlesServiceOptions.signedOut;
  const foundArticles = await findSlicedReadings(projection, populate);
  const session = await getSession(context);

  return {
    props: {
      articles: JSON.parse(JSON.stringify(foundArticles)) as DividedArticles[],
      session
    }
  }
}


export default Root;
