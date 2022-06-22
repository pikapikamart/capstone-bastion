import { 
  CenterItem, 
  MainButton } from "@/styled/shared/collection";
import { BaseModal } from "..";
import { 
  ContentContainer,
  DefaultContainer, 
  Heading, 
  MiddleContent, 
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
    <BaseModal>
      <DefaultContainer as="div">
        <ContentContainer>
          <Heading>Welcome!</Heading>
          <MiddleContent>
            Your { userType } account has been successfully created!  We are glad for you to join us!
          </MiddleContent>
          <CenterItem>
            <MainButton onClick={ handleSignUp }>Close</MainButton>
          </CenterItem>
        </ContentContainer>
      </DefaultContainer>
    </BaseModal>
  );
}


export default Welcome;