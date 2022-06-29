import { addErrors, removeErrors, validateInput } from "@/lib/utils";
import { BorderedButton, MainButton } from "@/styled/shared/collection";
import { SrOnly } from "@/styled/shared/helpers";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { BaseModal } from "../modal";
import { 
  ContentContainer,
  ControlContainer,
  Form, 
  Heading, 
  Input, 
  InputContainer, 
  InputError, 
  InputLabel, 
  TopControl, 
  TopControls, 
  UserControlContainer, 
  UserFieldset,
  UserLegend} from "../modal/modal.styled";


interface AuthProps {
  csrfToken?: string
}

type UserType = "writer" | "student" | "";

interface UserData {
  [ key: string ] : string,
  email: string,
  password: string 
}

const Auth = ( { csrfToken }: AuthProps ) =>{
  const [ userType, setUserType ] = useState<UserType>("");
  const [ userData, setUserData ] = useState<UserData>({
    email: "",
    password: ""
  });
  const [ submitForm, setSubmitForm ] = useState(false);
  const inputFields = useRef<HTMLInputElement[]>([]);
  const form = useRef<HTMLFormElement | null>(null);
  const liveRegion = useRef<HTMLParagraphElement | null>(null);
  const router = useRouter();

  const addInputRef = ( element: HTMLInputElement ) =>{
    if ( !inputFields.current.includes(element) ) {
      inputFields.current.push(element);
    }
  }

  const handleFormSubmit = () =>{
    const errorFields: string[] = [];

    inputFields.current.map(input =>{
      if ( !input ) return;

      if ( validateInput(input) ) {
        removeErrors(input);
        setUserData(prev => ({
          ...prev,
          [input.name]: input.value
        }))
      } else {
        addErrors(input);
        errorFields.push(input.name);
      }

      if ( errorFields.length && liveRegion.current ) {
        liveRegion.current.textContent = `Form invalid. Please check your ${ errorFields.join(", ") } fields.`;
      } else {
        setSubmitForm(true);
      }
    })
  }

  useEffect(() =>{
    if ( submitForm && userType ) {
      setSubmitForm(false);

      const submit = async () =>{
        try {
          const result = await fetch(`/api/user/signin/${ userType }`, {
            headers: {
              "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(userData)
          })

          if ( result.ok && form.current ) {
            form.current.submit();
          } 
        } catch( error ) {

        }
      };

      submit();
    }
  }, [ submitForm ])

  return (
    <BaseModal>
      <Form
        method="post"
        action="/api/auth/callback/credentials"
        noValidate
        ref={ form }>
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
            onClick={ () => router.back() }>
              <SrOnly>Close form and return to previous page</SrOnly>
          </TopControl>
        </TopControls>
        <Heading>Sign In</Heading>
        { !userType && (
          <UserFieldset>
            <UserLegend>Sign in as </UserLegend>
            <UserControlContainer>
              <BorderedButton onClick={ () => setUserType("writer") }>Writer</BorderedButton>
              <BorderedButton onClick={ () => setUserType("student") }>Student</BorderedButton>
            </UserControlContainer>
          </UserFieldset>
        ) }
        { userType && (
          <ContentContainer>
            <input 
              name="csrfToken"
              type="hidden"
              defaultValue={ csrfToken } />
            <input
              name="userType"
              type="hidden"
              defaultValue={ userType } />
            <InputContainer>
              <Input
                type="text"
                name="email"
                id="email"
                required
                ref={ addInputRef } />
              <InputLabel htmlFor="email" >Email address</InputLabel>
              <InputError id="email-error">please enter a proper email</InputError>
            </InputContainer>
            <InputContainer>
              <Input
                type="password"
                name="password"
                id="password"
                required
                ref={ addInputRef } />
              <InputLabel htmlFor="password" >Password</InputLabel>
              <InputError id="password-error">please enter a password</InputError>
            </InputContainer>
            <ControlContainer>
              <MainButton 
                type="button"
                onClick={ handleFormSubmit }>Submit</MainButton>
            </ControlContainer>
          </ContentContainer>
        ) }
      </Form>
    </BaseModal>
  );
}


export default Auth;