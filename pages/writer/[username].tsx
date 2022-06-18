import { 
  GetStaticPaths, 
  GetStaticPropsContext, 
  InferGetServerSidePropsType, 
  NextPage } from "next";
import { writerServiceOptions } from "@/api-lib/controller/options";
import { connectDatabase } from "@/api-lib/db";
import { findWriter } from "@/api-lib/service/writer.service";
import { findAllWriters } from "@/api-lib/service/writers.service";
import { Writer as WriterT } from "@/store/tracked";
import { ParsedUrlQuery } from "querystring";
import { WriterPage } from "@/page-components/writer";


const Writer: NextPage<InferGetServerSidePropsType<typeof getStaticProps>> = ( { writer } ) => {

  return (
    <WriterPage writer={ writer } />
  );
}

interface Params {
  params: {
    username: string
  }
}

export const getStaticPaths: GetStaticPaths = async () =>{
  await connectDatabase();
  const writers = await findAllWriters("-_id -firstName -lastName -email -password -searchId -writerId -writings -image -bio");
  const writersParams = writers?.reduce(( acc: Params[], cur ) => {
    acc.push({
      params: {
        username: cur.username
      }
    })

    return acc;
  }, [])

  return {
    paths: writersParams ?? [{ params: { username: "hi" } }],
    fallback: false
  }
}

interface UsernameParams extends ParsedUrlQuery {
  username: string
}

export const getStaticProps = async ( context: GetStaticPropsContext ) =>{
  await connectDatabase();
  const { username } = context.params as UsernameParams;
  const serviceOptions = {
    ...writerServiceOptions,
    query: {
      username
    }
  }
  const foundWriter = await findWriter(
    serviceOptions.query,
    serviceOptions.projection,
    serviceOptions.populate
  )

  return {
    props: {
      writer: JSON.parse(JSON.stringify(foundWriter)) as WriterT
    }
  }
}


export default Writer;