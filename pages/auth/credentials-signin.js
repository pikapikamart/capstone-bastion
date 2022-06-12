import { Authentication } from "../../page-components/auth";
import { getCsrfToken } from "next-auth/react"


export default function SignIn({ csrfToken }) {

  return (
    <Authentication csrfToken={ csrfToken } />
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}