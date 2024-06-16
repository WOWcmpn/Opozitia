import type { AuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: {label: 'email', type: 'email', required: true},
        password: {label: 'password', type: 'password', required: true},
      },
      async authorize(credentials, userData) {
        console.log(userData.query);
        if(!credentials?.email || !credentials.password) return null

        return userData.query as User
      }
    })
  ],
  pages: {
    signIn: '/'
  }
}