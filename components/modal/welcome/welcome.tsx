import { CenterItem, MainButton } from "@/styled/shared/collection";
import { 
  ContentContainer,
  DefaultContainer, 
  Heading, 
  WelcomeContent, 
  Wrapper } from "../modal.styled";


interface WelcomeProps {
  userType: "writer" | "student",
  handleSignUp?: () => void
}

const Welcome = ({
  userType,
  handleSignUp
}: WelcomeProps) =>{

  return (
    <Wrapper>
      <DefaultContainer as="div">
        <ContentContainer>
          <Heading>Welcome!</Heading>
          <WelcomeContent>
            Your { userType } account has been successfully created!  We are glad for you to join us!
          </WelcomeContent>
          <CenterItem>
            <MainButton onClick={ handleSignUp }>Close</MainButton>
          </CenterItem>
        </ContentContainer>
      </DefaultContainer>
    </Wrapper>
  );
}


export default Welcome;