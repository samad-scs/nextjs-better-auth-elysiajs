import { createAuthClient } from 'better-auth/react'
import { oneTapClient } from 'better-auth/client/plugins'

export const { signIn, signOut, signUp, useSession, getSession, oneTap } = createAuthClient({
  baseURL: 'http://localhost:3000',
  plugins: [
    oneTapClient({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      autoSelect: false,
      uxMode: 'redirect',
      cancelOnTapOutside: true,
      context: 'signin',
      additionalOptions: {},
      promptOptions: {
        baseDelay: 1000,
        maxAttempts: 5
      }
    })
  ]
})
