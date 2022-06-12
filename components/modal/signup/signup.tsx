import React, { 
  useEffect,
  useRef, 
  useState } from "react";
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
  ControlContainer,
  InputError } from "../modal.styled";
import { SrOnly } from "@/styled/shared/helpers";
import { 
  BorderedButton,
  MainButton } from "@/styled/shared/collection";
import { 
  addErrors, 
  removeErrors, 
  validateInput } from "@/lib/utils";
import { WelcomeModal } from "../welcome";


interface SignUpProps {
  handleSignUp: () => void
}

type UserType = "writer" | "student" | "";

interface UserInformation {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  studentId?: string,
  writerId?: string
}

interface PostData {
  success: boolean,
  data?: any,
  error?: {
    title: string,
    error: string
  }
}

const SignUp = ( { handleSignUp }: SignUpProps ) =>{
  const [ userType, setUserType ] = useState<UserType>("");
  const [ userInformation, setUserInformation ] = useState<UserInformation>({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const [ submitForm, setSubmitForm ] = useState(false);
  const [ postData, setPostData ] = useState<PostData>({
    success: false,
  });
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const liveRegion = useRef<HTMLParagraphElement | null>(null);

  const handleFormSubmit = ( event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    const errorFields: string[] = [];

    inputsRef.current.map(input => {
      if ( !input ) return;
   
      if ( validateInput(input) ) {
        removeErrors(input);
        setUserInformation(prev => ({
          ...prev,
          [ input.name ] : input.value
        }));
      } else {
        addErrors(input);
        errorFields.push(input.name);
      }
    })

    if ( errorFields.length && liveRegion && liveRegion.current ) {
      liveRegion.current.textContent = `Form invalid. Please check your ${ errorFields.join(", ") } input ${ errorFields.length>=2? " fields" : " field" }.`;
    } else {
      setSubmitForm(true);
    }
  }

  const addInputRef = ( element: HTMLInputElement ) =>{
    if ( inputsRef && !inputsRef.current.includes(element) ) {
      inputsRef.current.push(element);
    }
  }

  useEffect(() =>{
    if ( submitForm && userType ) {
      const submit = async () =>{
        try {
          const fetchResult = await fetch(`/api/user/${ userType }`,{
            headers: {
              "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(userInformation)
          });

          if ( fetchResult.ok ) {
            setPostData(prev => ({
              ...prev,
              success: true
            }))
          }
        } catch ( error ) {

        }
      }

      submit();
    }
  }, [ submitForm ])

  return (
    <BaseModal>
      { postData.success && userType && (
        <WelcomeModal 
          userType={ userType }
          handleSignUp={ handleSignUp } />
      ) }
      <Form 
        noValidate
        onSubmit={ handleFormSubmit }>
        <SrOnly 
          as="p"
          ref={ liveRegion }
          aria-live="polite" />
        <TopControls>
          { userType && (
            <TopControl 
              type="button"
              onClick={ () => setUserType("") }>
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
        { !userType && (
          <UserFieldset>
            <UserLegend>Choose what kind of user you are</UserLegend>
            <UserControlContainer>
              <BorderedButton onClick={ () => setUserType("writer") }>Writer</BorderedButton>
              <BorderedButton onClick={ () => setUserType("student") }>Student</BorderedButton>
            </UserControlContainer>
          </UserFieldset>
        ) }
        { userType && (
          <ContentContainer>
            <InputContainer>
              <Input
                type="text"
                name="firstName"
                id="firstName"
                required
                ref={ addInputRef } />
              <InputLabel htmlFor="firstName">First name</InputLabel>
              <InputError id="firstName-error" >please add your first name</InputError>
            </InputContainer>
            <InputContainer>
              <Input
                type="text"
                name="lastName"
                id="lastName"
                required
                ref={ addInputRef } />
              <InputLabel htmlFor="lastName">Last name</InputLabel>
              <InputError id="lastName-error" >please add your last name</InputError>
            </InputContainer>
            <InputContainer>
              <Input
                type="text"
                name="email"
                id="email"
                required
                ref={ addInputRef } />
              <InputLabel htmlFor="email">Email address</InputLabel>
              <InputError id="email-error" >please enter a proper email address</InputError>
            </InputContainer>
            <InputContainer>
              <Input
                type="password"
                name="password"
                id="password"
                required
                ref={ addInputRef } />
              <InputLabel htmlFor="password">
                Password
                <span> (minimum of 8 characters)</span> 
              </InputLabel>
              <InputError id="password-error" >please follor password format</InputError>
            </InputContainer>
            { userType==="student" && (
              <InputContainer>
                <Input
                  type="text"
                  name="studentId"
                  id="studentId"
                  required
                  ref={ addInputRef } />
                <InputLabel htmlFor="studentId">Student Id</InputLabel>
                <InputError id="studentId-error" >please enter a correct student id</InputError>
              </InputContainer>
            ) }
            { userType==="writer" && (
              <InputContainer>
                <Input
                  type="text"
                  name="writerId"
                  id="writerId"
                  required
                  ref={ addInputRef } />
                <InputLabel htmlFor="writerId">Writer Id</InputLabel>
                <InputError id="writerId-error" >please enter a correct writer id</InputError>
              </InputContainer>
            ) }
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