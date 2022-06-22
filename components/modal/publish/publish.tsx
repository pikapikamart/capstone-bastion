import { SubmitData } from "@/components/layout/header/publish/publish";
import { 
  ResultJson,
  useDispatch, 
  useTrackedState } from "@/store/tracked";
import { 
  CenterItem, 
  MainButton, 
  Relative } from "@/styled/shared/collection";
import { SrOnly } from "@/styled/shared/helpers";
import React, { 
  useEffect, 
  useState } from "react";
import { BaseModal } from "..";
import {
  Wrapper,
  DefaultContainer,
  ContentContainer,
  TopControls,
  TopControl,
  Heading,
  MiddleContent,
  Select
} from "../modal.styled";


const categories = [
  "news",
  "education",
  "entertainment",
  "updates",
  "sports"
]

interface PublishProps {
  handleExpansion: () => void,
  setSubmitData: React.Dispatch<React.SetStateAction<SubmitData>>
}

const Publish = ( {
  handleExpansion,
  setSubmitData
}: PublishProps ) =>{
  const [ submit, setSubmit ] = useState(false);
  const { writing } = useTrackedState();
  const dispatch = useDispatch();

  const handleArticlePublish = ( event: React.FormEvent<HTMLFormElement> ) =>{
    event.preventDefault();

    if ( !writing ) return;

    for ( const[ key, value ] of Object.entries(writing) ) {
      if ( 
        !value 
        || ( key==="content" && value==="<p><br></p>" )
        || ( key==="category" && !categories.includes(value) ) ) {
        setSubmitData(prev => ({
          ...prev,
          isError: true,
          message: "Ooops. Try checking your article fields again."
        }))

        return;
      }
    }

    setSubmit(true);
  }

  useEffect(() =>{
    if ( submit ) {

      try {
        const sendArticle = async() =>{
          const result = await fetch("/api/article", {
            headers: {
              "Content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(writing)
          });
          const resultJson: ResultJson = await result.json();

          if ( result.ok ) {
            setSubmitData( prev => ({
              ...prev,
              isSuccess: true,
              message: resultJson.data
            }))
          } else {
            setSubmitData( prev => ({
              ...prev,
              isError: true,
              message: resultJson.data
            }))
          }
        }

        sendArticle();
      } catch( error ) {

      }
    }
  }, [ submit ])

  return (
    <BaseModal>
      <DefaultContainer onSubmit={ handleArticlePublish }>
        <Relative>
          <TopControls absolute={ true }>
            <TopControl 
              type="button"
              onClick={ handleExpansion }>
              <SrOnly>Close publish form</SrOnly>
            </TopControl>
          </TopControls>
          <ContentContainer>
            <Heading>Publish now</Heading>
            <MiddleContent as="div">
              <label htmlFor="category">Choose a category for your writing</label>
              <Select
                id="category"
                onChange={ event => {
                  dispatch({
                    type: "SAVE_WRITING",
                    field: "type",
                    data: event.target.value[0].toUpperCase() + event.target.value.slice(1)
                  })
                }}>
                  <option hidden value=""></option>
                  <option value="News">News</option>
                  <option value="Education">Education</option>
                  <option value="Sports">Sports</option>
                  <option value="Entertainement">Entertainment</option>
                  <option value="Updates">Updates</option>
                </Select>
            </MiddleContent>
            <CenterItem>
              <MainButton 
                type="submit">Publish</MainButton>
            </CenterItem>
          </ContentContainer>
        </Relative>
      </DefaultContainer>
    </BaseModal>
  );
}


export default Publish;