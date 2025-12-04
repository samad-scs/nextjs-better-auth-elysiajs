import { NextResponse } from 'next/server'

export const proxy = (req: Request) => {
  console.log('REACHED HERE')
  return NextResponse.next()
}
