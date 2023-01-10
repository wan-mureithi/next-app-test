import NextAuth from "next-auth";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    {
      id: "identity-custom",
      name: "IdentityCustom",
      authorization: { 
        params: { 
        scope: "offline_access openid profile email phone AccountService IdentityService AdministrationService SaasService TreasuryService" 
      } 
    },
      wellKnown: 'https://authserver.purplecliff-03d4fbdd.westeurope.azurecontainerapps.io/.well-known/openid-configuration',
      issuer: 'https://authserver.purplecliff-03d4fbdd.westeurope.azurecontainerapps.io/',
      clientId: "reactTestUi",
      clientSecret: "123456789",
      type: 'oauth',
      version: "2.0",
       profile(profile, tokens) {
        console.log(tokens)
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          accessToken: tokens.access_token
        }
      },
    }
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      if(session?.user){
        session.accessToken = token.accessToken
      }
      
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error:'/auth/error'
  }
});
