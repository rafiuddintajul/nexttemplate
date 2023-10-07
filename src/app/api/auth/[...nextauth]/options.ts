import { compare } from 'bcryptjs'
import type { NextAuthOptions, Profile } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import User from '@/models/user'
import { connectDB } from '@/utils/database'
import { SessionUser } from '@/types/auth'
import { AdapterUser } from 'next-auth/adapters'
import { JWT } from 'next-auth/jwt'
import { User as NextAuthUser } from 'next-auth'

type UserJWT = AdapterUser & {
  _id?: string
} | NextAuthUser & {
  _id?: string
}

type UserProfile = Profile & {
  picture?:string
}

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credential',
      credentials: {
        username: {
          label: 'Username:',
          type: 'text',
          placeholder: 'Username...'
        },
        password: {
          label: 'Password:',
          type: 'password',
          placeholder: 'Password...'
        },
      },
      async authorize(credentials: any, req) {
        // Add logic here to look up the user from the credentials supplied
        await connectDB()
        let user = await User.findOne({ username: credentials?.username }).select("+password")
        // Sample user obj { id:'1', username:'username10', password: 'abcd1234' }
        user = user.toObject()
        const passwordMatched = await compare(credentials!.password, user.password!)

        if (user) {
          // Compare provided password with user password in db
          if (passwordMatched) {
            delete user.password
            return user
          }
          throw new Error('Password does not matched')
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          throw new Error('User does not exists')
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }:{ token:JWT, user:UserJWT }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      // customizing jwt here to be used by next level authentication like session
      const userDB = await User.findOne({ email: token.email })
      return {...token, role: userDB.role}
    },
    async session({ session, token }) {
      // customizing session here to be used by method like getServerSession, getSession etc.
      // session.user!.id = token.user_id
      // session.user!.name = token.name ?? token.user.username
      // console.log('session function runs')
      // const user = await User.findOne({ email: session.user?.email })
      // console.log(user)
      // if (user && session.user) {
      //   session.user.id = user._id
      // }
      return session
    },
    async signIn({ profile }:{ profile?: UserProfile | undefined }){
      // on signin with noncrendential providers register user in our db for organizational purpose
      try {
        await connectDB()
        const userExists = await User.findOne({ email:profile?.email })
        if (!userExists) {
          await User.create({ 
            email: profile?.email, 
            username: profile?.name?.replace(' ','').toLowerCase(),
            image: profile?.image ?? profile?.picture
          })
        }
        return true        
      } catch (error) {
        console.log(error)
        return false
      }
    }
  }
}
