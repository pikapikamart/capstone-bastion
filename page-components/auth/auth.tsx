import { AuthenticationForm } from "@/components/auth";


interface AuthProps {
  csrfToken?: string
}

const Auth = ( { csrfToken }: AuthProps ) =>{

  return (
    <AuthenticationForm  csrfToken={ csrfToken } />
  );
}


export default Auth;