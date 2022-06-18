import { 
  ContentContainer, 
  Wrapper } from "./writer.styled";
import { Writer as WriterT } from "@/store/tracked";
import { ProfileSection } from "@/components/writer/profile";
import { writerFullName } from "@/lib/utils";
import { ArticlesSection } from "@/components/writer/articles";
import { Articles } from "@/components/shared/articles";
import { Writers } from "@/components/shared/writers";


interface WriterProps {
  writer: WriterT
}

const Writer = ( { writer }: WriterProps ) =>{

  return (
    <Wrapper>
      <ContentContainer>
        <ProfileSection
          image={ writer.image }
          name={ writerFullName(writer) }
          bio={ writer.bio } />
        <ArticlesSection>
          <Articles articles={ writer.writings } />
        </ArticlesSection>
      </ContentContainer>
      <Writers writers={[]}>
        Discover more writers
      </Writers>
    </Wrapper>
  );
}


export default Writer;