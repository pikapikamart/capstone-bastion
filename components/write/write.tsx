import { 
  useEffect,
  useRef,
  useState } from "react";
import { 
  StoryArea,
  Textarea,
  TitleHolder, 
  Wrapper } from "./write.styled";
import { useDispatch, useTrackedState } from "@/store/tracked";
import { WritingImage } from "./image";
import xss from "xss";


const Write = () =>{
  const [ isWriting, setIsWriting ] = useState(false);
  const storyArea = useRef<HTMLDivElement | null>(null);
  const { writing } = useTrackedState();
  const dispatch = useDispatch();
  
  const handleOnInput = ( event: React.ChangeEvent<HTMLTextAreaElement> ) =>{
    const target = event.target as HTMLElement;
    
    if ( target.parentNode ) {
      (target.parentNode as HTMLElement).dataset.value = event.target.value;
    }
  }
  
  useEffect(() =>{
    dispatch({ type: "START_WRITING" });
  }, [])

  if ( !writing ) {
    return <div></div>
  }

  return (
    <Wrapper>
      <WritingImage />
      <TitleHolder>
        <Textarea 
          rows={ 1 } 
          placeholder="Title"
          onInput={ handleOnInput }
          onBlur={ event => {
            dispatch({
              type: "SAVE_WRITING",
              field: "title",
              data: event.target.value
            })
          } }></Textarea>
      </TitleHolder>
      <StoryArea
        contentEditable="true"
        suppressContentEditableWarning={ true }
        data-placeholder="Write your story..."
        ref={ storyArea }
        isWriting={ isWriting }
        onKeyDown={ event => {
          if ( storyArea.current ) {
            if ( storyArea.current.innerHTML==="<p><br></p>" && event.key==="Backspace" ) {
              event.preventDefault();
              storyArea.current.classList.remove("typing");
              setIsWriting(false);
            }
            else {
              setIsWriting(true);
            }
          }
        }}
        onBlur={ event => {
          dispatch({
            type: "SAVE_WRITING",
            field: "content",
            data: event.target.innerHTML==="<p><br></p>"? "" : xss(event.target.innerHTML)
          })
        } } >
          <p><br /></p>
        </StoryArea>
    </Wrapper>    
  );
}


export default Write;