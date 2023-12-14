import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_APP_ID as string,
      clientSecret: process.env.GOOGLE_APP_SECRET as string
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_APP_ID as string,
      clientSecret: process.env.FACEBOOK_APP_SECRET as string
    })
  ],

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token = Object.assign({}, token, { accessToken: account.access_token, provider: account.provider })
      }
      return token
    },
    async session({ session, token }) {
      if (session) {
        session = Object.assign({}, session, { accessToken: token.accessToken, provider: token.provider }) 
      }
      return session
    }
  }
})
