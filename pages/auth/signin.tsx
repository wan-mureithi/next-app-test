import React from 'react';
import { signIn, getProviders } from "next-auth/react"
import { ProviderInterface } from '../api/auth/types/next-auth';
import styles from '../../styles/Home.module.css'

interface SignInProps {
    providers: ProviderInterface
}

const Signin: React.FC<SignInProps> = ({ providers }) => {
 
  return (
    <div className={styles.main}>
      {providers && Object.values(providers).map((provider) => (
        <div className={styles.center} key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export default Signin

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}