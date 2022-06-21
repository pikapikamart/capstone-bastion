import { PublishContainer } from "../header.styled"
import {
   BorderedButton, 
   MainButton } from "@/styled/shared/collection"
import { useExpansion } from "@/lib/hooks";
import { PublishModal } from "@/components/modal/publish";
import { 
  useEffect, 
  useState } from "react";


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

  }, [ submitData.isSuccess ])

  return (
    <>
      <PublishContainer>
        <BorderedButton>Save</BorderedButton>
        <MainButton onClick={ handleExpansion }>Publish</MainButton>
      </PublishContainer>
       { isExpanded && <PublishModal 
        handleExpansion={ handleExpansion }
        setSubmitData={ setSubmitData } /> }
    </>
  )
}


export default Publish;