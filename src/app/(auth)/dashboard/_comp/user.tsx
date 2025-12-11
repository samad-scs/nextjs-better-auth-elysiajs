'use client'
import React from 'react'
import { client } from '@libs/auth-client'

const UserDetails = () => {
  const { data: session } = client.useSession()

  return <div>UserDetails : {session?.user?.name}</div>
}

export default UserDetails
