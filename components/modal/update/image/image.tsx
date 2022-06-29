import { 
  FileInput, 
  ImageWrapper, 
  Label, 
  Wrapper } from "./image.styled";
import { UpdateInformation } from "../update";


interface ImageProps {
  image: string,
  setUpdateInformation: React.Dispatch<React.SetStateAction<UpdateInformation>>
}

const Image = ( { 
  image,
  setUpdateInformation
 }: ImageProps ) =>{

  const handleImageAddition = ( event: React.ChangeEvent<HTMLInputElement> ) =>{
    if ( event.target.files ) {
      const imageFile = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = ( readerEvent ) =>{
        const img = document.createElement("img");

        img.onload = ( imgEvent ) => {
          const canvas = document.createElement("canvas");
          canvas.height = 192;
          canvas.width = 192;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, 192, 192);
          const url = canvas.toDataURL(imageFile.type);
          setUpdateInformation(prev => ({
            ...prev,
            image: url
          }))
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
      <ImageWrapper src={ image? image : "/icons/default-avatar.svg" } />
      <FileInput 
        as="input"
        type="file"
        id="image"
        name="image"
        onChange={ handleImageAddition } />
      <Label htmlFor="image">Change profile picture</Label>  
    </Wrapper>
  )
}


export default Image;