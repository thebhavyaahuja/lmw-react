import { NextRequest, NextResponse } from 'next/server'
import { createUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName, userType } = await request.json()

    if (!email || !password || !firstName || !lastName || !userType) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (!['instructor', 'learner'].includes(userType)) {
      return NextResponse.json(
        { error: 'Invalid user type' },
        { status: 400 }
      )
    }

    const user = createUser({
      email,
      password,
      firstName,
      lastName,
      userType
    })

    // Return user without password
    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json({ user: userWithoutPassword })

  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
