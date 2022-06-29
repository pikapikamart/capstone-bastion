import { 
  ContentContainer, 
  Wrapper } from "./writer.styled";
import { Writer as WriterT } from "@/store/tracked";
import { ProfileSection } from "@/components/writer/profile";
import { ArticlesSection } from "@/components/writer/articles";
import { Articles } from "@/components/shared/articles";
import { Writers } from "@/components/shared/writers";
import { useSession } from "next-auth/react";


interface WriterProps {
  writer: WriterT
}

const Writer = ( { writer }: WriterProps ) =>{
  const { data } = useSession();

  return (
    <Wrapper>
      <ContentContainer>
        <ProfileSection
          writer={ writer } />
        <ArticlesSection>
          { !data && (
            <Articles 
              articles={ writer.writings }
              owned={ false } />
          ) }
          { data && (
            <Articles
              articles={ writer.writings }
              owned={ data.user?.username===writer.username } />
          ) }
        </ArticlesSection>
      </ContentContainer>
      <Writers writers={[]}>
        Discover more writers
      </Writers>
    </Wrapper>
  );
}


export default Writer;