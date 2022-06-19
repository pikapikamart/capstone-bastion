import { 
  NextPage,
  InferGetServerSidePropsType, 
  GetServerSidePropsContext} from "next";
import { Header } from "@/components/layout/header";
import { HTMLHead } from "@/page-components/layout/head";
import { GlobalStyles } from "@/styled/theme";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { WritePage } from "@/page-components/write";


type WriteNextPage<T> = NextPage<T> & {
  getLayout: ( page: React.ReactElement ) => React.ReactNode
}

const Write: WriteNextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ( { session } ) =>{
  const { data } = useSession();
  const router = useRouter();

  if ( !data ) {
    router.push("/");
  }

  return (
    <WritePage />
  );
}


Write.getLayout = ( page: React.ReactElement ) =>{

  return (
    <>
      <HTMLHead />
      <GlobalStyles />
      <Header />
      { page }
    </>
  );
}

export const getServerSideProps = async( context: GetServerSidePropsContext ) =>{
  const session = await getSession(context);

  return {
    props: {
      session
    }
  }
}


export default Write;