import React, { useState } from "react";
import { BaseModal } from "../";
import { 
  Form, 
  UserControlContainer, 
  UserFieldset, 
  UserLegend, 
  TopControls, 
  TopControl, 
  ContentContainer,
  Heading, 
  InputContainer, 
  Input, 
  InputLabel, 
  ControlContainer} from "../modal.styled";
import { SrOnly } from "@/styled/shared/helpers";
import { 
  BorderedButton,
  MainButton } from "@/styled/shared/collection";


interface SignUpProps {
  handleSignUp: () => void
}

type UserType = "writer" | "student" | "";

const SignUp = ( { handleSignUp }: SignUpProps ) =>{
  const [ user, setUser ] = useState<UserType>("");

  const handleFormSubmit = ( event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
  }

  return (
    <BaseModal>
      <Form 
        noValidate
        onSubmit={ handleFormSubmit }>
        <TopControls>
          { user && (
            <TopControl type="button">
              <SrOnly>Go to previous step</SrOnly>
            </TopControl>
          ) }
          <TopControl 
            type="button"
            onClick={ handleSignUp }>
            <SrOnly>Close sign up form</SrOnly>
          </TopControl>
        </TopControls>
        <Heading>Create your account</Heading>
        { !user && (
          <UserFieldset>
            <UserLegend>Choose what kind of user you are</UserLegend>
            <UserControlContainer>
              <BorderedButton onClick={ () => setUser("writer") }>Writer</BorderedButton>
              <BorderedButton onClick={ () => setUser("student") }>Student</BorderedButton>
            </UserControlContainer>
          </UserFieldset>
        ) }
        { user && (
          <ContentContainer>
            <InputContainer>
              <Input
                type="text"
                name="firstname"
                id="firstname"
                required />
              <InputLabel htmlFor="firstname">First name</InputLabel>
            </InputContainer>
            <InputContainer>
              <Input
                type="text"
                name="lastname"
                id="lastname"
                required />
              <InputLabel htmlFor="lastname">Last name</InputLabel>
            </InputContainer>
            <InputContainer>
              <Input
                type="text"
                name="email"
                id="email"
                required />
              <InputLabel htmlFor="email">Email address</InputLabel>
            </InputContainer>
            <InputContainer>
              <Input
                type="password"
                name="password"
                id="password"
                required />
              <InputLabel htmlFor="password">Password</InputLabel>
            </InputContainer>
            <InputContainer>
              <Input
                type="text"
                name="studentId"
                id="studentId"
                required />
              <InputLabel htmlFor="studentId">Student Id</InputLabel>
            </InputContainer>
            <ControlContainer>
              <MainButton type="submit">Submit</MainButton>
            </ControlContainer>
          </ContentContainer>
        ) }
      </Form>
    </BaseModal>
  );
}


export default SignUp;