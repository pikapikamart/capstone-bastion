import { 
  AddImage, 
  Wrapper } from "./image.styled";
import { SrOnly } from "@/styled/shared/helpers";
import { ArticleCreation } from "@/store/tracked";


interface ImageProps {
  setArticle: React.Dispatch<React.SetStateAction<Omit<ArticleCreation, "category" | "content">>>,
  image: string
}

const Image = ( {
  setArticle,
  image
}: ImageProps ) =>{

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
          setArticle( prev => ({
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
      <SrOnly 
        as="input"
        type="file"
        id="image"
        name="image"
        onChange={ handleImageAddition } />
      <AddImage
        htmlFor="image" 
        isDone={ image!=="" } >
        <SrOnly>Add image to article</SrOnly>
      </AddImage>
      { image && (
        <img 
          src={ image } 
          alt=""
          aria-hidden="true" />
      ) }
    </Wrapper>
  );
}


export default Image;