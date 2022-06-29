import { useSession } from "next-auth/react";
import { MainButton } from "@/styled/shared/collection";
import { 
  Avatar, 
  Bio, 
  Informations, 
  Name, 
  Wrapper } from "./profile.styled";
import { Writer } from "@/store/tracked";
import { writerFullName } from "@/lib/utils";
import { useCurrentWriter, useExpansion } from "@/lib/hooks";
import { UpdateProfileModal } from "@/components/modal/update";
import { useEffect } from "react";


interface ProfileProps {
  writer: Writer
}

const Profile = ( { writer }: ProfileProps ) =>{
  const { 
    data, 
    writer: currentWriter } = useCurrentWriter();
  const { isExpanded, handleExpansion } = useExpansion();

  useEffect(() =>{
    if ( isExpanded ) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

  }, [ isExpanded ])

  return (
    <Wrapper>
      <div>
        <Avatar
          src={ writer.image?? "/icons/default-avatar.svg" }
          alt={ writerFullName(writer) } />
      </div>
      <Informations>
        <Name>{ writerFullName(writer) }</Name>
        { currentWriter && (
          <Bio>{ currentWriter.bio? currentWriter.bio : "A mysterious writer who has yet to fill out my bio. One thing's for sure, I love writing." }</Bio>
        ) }
        { !currentWriter && (
          <Bio>{ writer.bio? writer.bio : "A mysterious writer who has yet to fill out my bio. One thing's for sure, I love writing." }</Bio>
        ) }
        { !data && <MainButton>Follow</MainButton> }
        { currentWriter?.username===writer.username && <>
          <MainButton
            onClick={ handleExpansion }>
            Edit profile
          </MainButton>
          { isExpanded && <UpdateProfileModal handleUpdate={ handleExpansion } /> }
        </> }
      </Informations>
    </Wrapper>
  );
}


export default Profile;