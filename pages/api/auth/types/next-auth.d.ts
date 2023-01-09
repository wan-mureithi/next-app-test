import {  DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

/** Example on how to extend the built-in session types */
declare module "next-auth" {
    interface Session {
        user: {
          /** The user's postal address. */
          address: string
        } & DefaultSession["user"]
      }
}

/** Example on how to extend the built-in types for JWT */
declare module "next-auth/jwt" {
  interface JWT {
    /** This is an example. You can find me in types/next-auth.d.ts */
    idToken?: string
  }
}

interface ProviderInterface {
    name: string;
    id: string;
}