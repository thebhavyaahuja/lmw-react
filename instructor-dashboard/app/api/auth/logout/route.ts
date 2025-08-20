import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // For a simple JSON-based auth system, logout is mainly handled on the client side
    // But we can still provide a proper API response
    return NextResponse.json({ 
      success: true, 
      message: 'Logged out successfully' 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
