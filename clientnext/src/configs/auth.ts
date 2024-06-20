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
        if(!credentials?.email || !credentials.password) return null

        return userData.query as User
      }
    })
  ],
  pages: {
    signIn: '/'
  },
  callbacks: {
    async jwt({token, user, session, trigger}) {
      if(trigger === 'update' &&
        session?.name &&
        session.email &&
        session.location &&
        session.age &&
        session.favoriteNewsCategory
      ) {
        token.name = session.name
        token.email = session.email
        token.location = session.location
        token.age = session.age
        token.favoriteNewsCategory = session.favoriteNewsCategory
      }

      if(user) {
        return {
          ...token,
          id: user.id,
          // @ts-ignore
          location: user.location,
          // @ts-ignore
          favoriteNewsCategory: user.favoriteNewsCategory,
          // @ts-ignore
          age: user.age
        }
      }
      return token
    },

    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          location: token.location,
          favoriteNewsCategory: token.favoriteNewsCategory,
          age: token.age
        }
      }
    },
  }
}