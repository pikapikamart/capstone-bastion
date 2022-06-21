import { 
  AddImage, 
  Wrapper } from "./image.styled";
import { SrOnly } from "@/styled/shared/helpers";
import { 
  useDispatch, 
  useTrackedState} from "@/store/tracked";


const Image = () =>{
  const dispatch = useDispatch();
  const { writing } = useTrackedState();

  const handleImageAddition = ( event: React.ChangeEvent<HTMLInputElement> ) =>{
    if ( event.target.files ) {
      const imageFile = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = ( readerEvent ) =>{
        const img = document.createElement("img");

        img.onload = ( imgEvent ) => {
          const canvas = document.createElement("canvas");
          canvas.height = 416;
          canvas.width = 826;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, 826, 416);
          const url = canvas.toDataURL(imageFile.type);
          dispatch({
            type: "SAVE_WRITING",
            field: "image",
            data: url
          })
        }

        img.src = readerEvent.target?.result as string;
      }

      if ( imageFile ) {
        reader.readAsDataURL(imageFile);
      }
    }
  }

  return (
    <Wrapper>
      <SrOnly 
        as="input"
        type="file"
        id="image"
        name="image"
        onChange={ handleImageAddition } />
      <AddImage
        htmlFor="image" 
        isDone={ writing?.image!=="" } >
        <SrOnly>Add image to article</SrOnly>
      </AddImage>
      { writing && (
        <img 
          src={ writing.image } 
          alt=""
          aria-hidden="true" />
      ) }
    </Wrapper>
  );
}


export default Image;