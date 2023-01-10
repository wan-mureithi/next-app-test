import React from "react";
import { useSession, signIn, signOut } from "next-auth/react"


function Login() {
    const { data: session } = useSession();

    const handleSignIn = () => {
        console.log('something is happening')
        signIn('identity-custom')
    }

    if (session) {
      console.log(session)
      localStorage.setItem('idToken', session.accessToken)
        return (
          <>
            Signed in as {session.user?.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </>
        )
      }
      return (
        <>
          <p>Not signed in</p> <br />
          <button onClick={handleSignIn}>Sign in</button>
        </>
      )
}

export default Login;