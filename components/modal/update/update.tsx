import { 
  useEffect,
  useRef, 
  useState } from "react";
import { SrOnly } from "@/styled/shared/helpers";
import { useSession } from "next-auth/react";
import { BaseModal } from ".."
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
  TopControls } from "../modal.styled";
import { UpdateImage } from "./image";
import { useCurrentWriter } from "@/lib/hooks";
import { MainButton } from "@/styled/shared/collection";
import { addErrors, removeErrors, validateInput } from "@/lib/utils";
import { useDispatch } from "@/store/tracked";
import { useRouter } from "next/router";


interface UpdateProps {
  handleUpdate: () => void
}

export interface UpdateInformation {
  firstName: string,
  lastName: string,
  image: string,
  bio: string
}

const Update = ( { handleUpdate }: UpdateProps ) =>{
  const [ updateInformation, setUpdateInformation ] = useState<UpdateInformation>({
    firstName: "",
    lastName: "",
    image: "",
    bio: ""
  });
  const [ submitForm, setSubmitForm ] = useState(false);
  const liveRegion = useRef<HTMLParagraphElement | null>(null);
  const inputFields = useRef<HTMLInputElement[]>([]);
  const { writer } = useCurrentWriter();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleFormSubmit = ( event: React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    const errorFields: string[] = [];

    inputFields.current.map(input => {
      if ( !input ) return;
   
      if ( input.required && validateInput(input) ) {
        removeErrors(input);
        setUpdateInformation(prev => ({
          ...prev,
          [ input.name ] : input.value
        }));
      } else if ( !input.required ) {
        setUpdateInformation(prev => ({
          ...prev,
          [ input.name ] : input.value
        }));
      }
      else {
        addErrors(input);
        errorFields.push(input.name);
      }
    })

    if ( errorFields.length && liveRegion.current ) {
      liveRegion.current.textContent = `Form invalid. Please check your ${ errorFields.join(", ") } input ${ errorFields.length>=2? " fields" : " field" }.`;
    } else {
      setSubmitForm(true);
    }
  } 

  const addInputRef = ( element: HTMLInputElement ) =>{
    if ( inputFields && !inputFields.current.includes(element) ) {
      inputFields.current.push(element);
    }
  }

  useEffect(() =>{
    if ( writer ) {
      setUpdateInformation(prev => ({
        ...prev,
        firstName: writer.firstName,
        lastName: writer.lastName,
        image: writer.image,
        bio: writer.bio?? ""
      }))
    }
  }, [])

  useEffect(() =>{
    if ( submitForm ) {
      const submit = async () =>{
        const result = await fetch("/api/user/writer", {
          headers: {
            "Content-Type": "application/json"
          },
          method: "PATCH",
          body: JSON.stringify(updateInformation)
        })

        if ( result.ok ) {
          dispatch({
            type: "UPDATE_WRITER_PROFILE",
            payload: updateInformation
          });
          handleUpdate();
          router.reload();
        }
      }

      submit();
    }
  }, [ submitForm ])

  return (
    <BaseModal>
      <Form
        noValidate
        onSubmit={ handleFormSubmit }>
        <SrOnly
          as="p"
          aria-live="polite"
          ref={ liveRegion } />
        <TopControls>
          <TopControl
            type="button"
            onClick={ handleUpdate }>
              <SrOnly>Close update profile modal</SrOnly>
          </TopControl>
        </TopControls>
        <Heading>Update your profile</Heading>
        <UpdateImage
          image={ updateInformation.image }
          setUpdateInformation={ setUpdateInformation } />
          <ContentContainer>
            <InputContainer>
              <Input
                type="text"
                name="firstName"
                id="firstName"
                required
                ref={ addInputRef }
                defaultValue={ updateInformation.firstName } />
              <InputLabel htmlFor="firstName">First name</InputLabel>
              <InputError id="firstName-error" >please add your first name</InputError>
            </InputContainer>
            <InputContainer>
              <Input
                type="text"
                name="lastName"
                id="lastName"
                required
                ref={ addInputRef }
                defaultValue={ updateInformation.lastName } />
              <InputLabel htmlFor="lastName">Last name</InputLabel>
              <InputError id="lastName-error" >please add your first name</InputError>
            </InputContainer>
            <InputContainer>
              <Input
                type="text"
                name="bio"
                id="bio"
                maxLength={ 160 }
                ref={ addInputRef }
                defaultValue={ updateInformation.bio } />
              <InputLabel htmlFor="bio">Bio <span>( max of 160 characters )</span> </InputLabel>
            </InputContainer>
            <ControlContainer>
              <MainButton type="submit">Update</MainButton>
            </ControlContainer>
          </ContentContainer>
      </Form>
    </BaseModal>
  );
}


export default Update;