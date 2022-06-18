import { MainButton } from "@/styled/shared/collection";
import { 
  Avatar, 
  Bio, 
  Informations, 
  Name, 
  Wrapper } from "./profile.styled";


interface ProfileProps {
  image: string,
  name: string,
  bio?: string
}

const Profile = ( {
  image,
  name,
  bio
}: ProfileProps ) =>{

  return (
    <Wrapper>
      <div>
        <Avatar
          src={ image }
          alt={ name } />
      </div>
      <Informations>
        <Name>{ name }</Name>
        <Bio>{ bio?? "A mysterious writer who has yet to fill out my bio. I love writing." }</Bio>
        <MainButton>Follow</MainButton>
      </Informations>
    </Wrapper>
  );
}


export default Profile;