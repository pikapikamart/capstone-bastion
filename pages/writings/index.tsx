import { WritingsPage } from "@/page-components/writings";
import { 
  GetServerSidePropsContext, 
  InferGetServerSidePropsType, 
  NextPage } from "next";
import { 
  getSession, 
  useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";



const Writings: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = () =>{
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
    <WritingsPage />
  );
}

export const getServerSideProps = async( content: GetServerSidePropsContext ) =>{
  const session = await getSession();

  return {
    props: {
      session
    }
  }
}


export default Writings;