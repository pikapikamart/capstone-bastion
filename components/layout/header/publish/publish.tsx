import { PublishContainer } from "../header.styled"
import {
   BorderedButton, 
   MainButton } from "@/styled/shared/collection"
import { useExpansion } from "@/lib/hooks";
import { PublishModal } from "@/components/modal/publish";
import { 
  useEffect, 
  useState } from "react";
import { BaseModal } from "@/components/modal";
import { DefaultContainer, Heading, MiddleContent } from "@/components/modal/modal.styled";
import { useRouter } from "next/router";


export interface SubmitData {
  isError: boolean,
  isSuccess: boolean,
  message: string | string[]
}

const Publish = () =>{
  const [ submitData, setSubmitData ] = useState<SubmitData>({
    isError: false,
    isSuccess: false,
    message: ""
  });
  const { isExpanded, handleExpansion } = useExpansion();
  const router = useRouter();

  useEffect(() =>{
    if ( isExpanded ) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [ isExpanded ])

  useEffect(() =>{
    if ( submitData.isError ) {
      handleExpansion();
      // Show toast notification
    }
  }, [ submitData.isError ])

  useEffect(() =>{
    if ( submitData.isSuccess ) {
      const timeout = setTimeout(() => router.push("/home"), 4000);
    
      return () => clearTimeout(timeout);
    }
  }, [ submitData.isSuccess ])

  return (
    <>
      <PublishContainer>
        <BorderedButton>Save</BorderedButton>
        <MainButton onClick={ handleExpansion }>Publish</MainButton>
      </PublishContainer>
      { submitData.isSuccess && (
        <BaseModal>
          <DefaultContainer as="div">
            <Heading>Thank you!</Heading>
            <MiddleContent>{ submitData.message }</MiddleContent>
          </DefaultContainer>
        </BaseModal>
      ) }
      { isExpanded && !submitData.isSuccess && <PublishModal 
        handleExpansion={ handleExpansion }
        setSubmitData={ setSubmitData } /> }
    </>
  )
}


export default Publish;