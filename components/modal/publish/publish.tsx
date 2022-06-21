import { SubmitData } from "@/components/layout/header/publish/publish";
import { 
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
      if ( !value || (key==="content" && value==="<p><br></p>") ) {
        setSubmitData(prev => ({
          ...prev,
          isError: true,
          message: "Ooops. Try checing your article fields again."
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
          const result = await fetch("/api/")
        }
        // sendArticle();
      } catch( error ) {

      }
    }
  }, [ submit ])

  return (
    <Wrapper>
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
                    data: event.target.value
                  })
                }}>
                  <option value="news">News</option>
                  <option value="education">Education</option>
                  <option value="sports">Sports</option>
                  <option value="entertainement">Entertainment</option>
                  <option value="updates">Updates</option>
                </Select>
            </MiddleContent>
            <CenterItem>
              <MainButton 
                type="submit">Publish</MainButton>
            </CenterItem>
          </ContentContainer>
        </Relative>
      </DefaultContainer>
    </Wrapper>
  );
}


export default Publish;