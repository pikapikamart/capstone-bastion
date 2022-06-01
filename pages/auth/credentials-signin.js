import { getCsrfToken } from "next-auth/react"
import { useState, useRef } from "react"


export default function SignIn({ csrfToken }) {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const form = useRef(null);
  const userType = "writer";

  const handleFetch = async data =>{

    try {
      const result = await fetch(`/api/user/signin/${ userType }`, {
        headers: {
          "Content-type": "application-json"
        },
        method: "POST",
        body: JSON.stringify(data)
      });

      const resultJson = await result.json();
    
      if ( !result.ok ) {
        throw new Error(resultJson.title);
      }

      return true;
      
    } catch( error ) {
      return false;
    }
  }

  const handleFormButtonClick = async () => {
    const data = {
      email,
      password
    }

    const result = await handleFetch(data);

    if ( result ) {
      form.current.submit();
    }
  }

  return (
    <form method="post" action="/api/auth/callback/credentials" ref={ form }>
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <input name="userType" type="hidden" defaultValue={ userType }/>
      <label>
        email
        <input name="email" type="text" onChange={ e => setEmail(e.target.value) } value={ email } />
      </label>
      <label>
        Password
        <input name="password" type="password" onChange={ e => setPassword(e.target.value) } value={ password } />
      </label>
      <button type="button" onClick={ handleFormButtonClick }> Sign in</button>
    </form>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}