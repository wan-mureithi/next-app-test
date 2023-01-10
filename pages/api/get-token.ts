
import { getToken } from "next-auth/jwt"

 export const  TokenFetch = async (req: any, res: { status: (arg0: number) => void; end: () => void }) => {
  // If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`
  const token = await getToken({ req })
  if (token) {
    // Signed in
    console.log("JSON Web Token", JSON.stringify(token, null, 2))
    return token;
  } else {
    // Not Signed in
    res.status(401)
  }
  res.end()
}

export function getTokenFromLocalStorage() {
  if (typeof window !== 'undefined') {
    // Perform localStorage action
    const token = localStorage.getItem('idToken');
    return token;
  }
  
 
}