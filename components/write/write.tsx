import { 
  useEffect,
  useRef,
  useState } from "react";
import { 
  StoryArea,
  Textarea,
  TitleHolder, 
  Wrapper } from "./write.styled";
import { 
  ArticleCreation, 
  useDispatch, 
  useTrackedState} from "@/store/tracked";
import { WritingImage } from "./image";
import xss from "xss";


const Write = () =>{
  const [ article, setArticle ] = useState<Omit<ArticleCreation, "category" | "content">>({
    image: "",
    title: "",
    contentSanitized: "",
  });
  const [ isWriting, setIsWriting ] = useState(false);
  const storyArea = useRef<HTMLDivElement | null>(null);
  const { writing } = useTrackedState();
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch({ type: "START_WRITING" });
  }, [])

  const handleOnInput = ( event: React.ChangeEvent<HTMLTextAreaElement> ) =>{
    const target = event.target as HTMLElement;

    if ( target.parentNode ) {
      (target.parentNode as HTMLElement).dataset.value = event.target.value;
    }
  }

  return (
    <Wrapper onBlur={ (event) => {
      if ( !event.currentTarget.contains(event.relatedTarget) ) {
        dispatch({ type: "SAVE_WRITING", payload: article });
      }
    } } >
      <WritingImage setArticle={ setArticle } image={ article.image } />
      <TitleHolder>
        <Textarea 
          rows={ 1 } 
          placeholder="Title"
          onInput={ handleOnInput }
          onBlur={ event => {
            setArticle(prev => ({
              ...prev,
              title: event.target.value
            }))
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
          setArticle(prev => ({
            ...prev,
            contentSanitized: event.target.innerHTML==="<p><br></p>"? "" : xss(event.target.innerHTML)
          }) )
        } } >
          <p><br /></p>
        </StoryArea>
    </Wrapper>    
  );
}


export default Write;