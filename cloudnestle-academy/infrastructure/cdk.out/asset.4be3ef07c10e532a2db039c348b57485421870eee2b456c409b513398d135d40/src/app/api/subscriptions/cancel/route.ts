import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { subscription: true },
    })

    if (!user || !user.subscription) {
      return NextResponse.json({ error: 'No active subscription found' }, { status: 404 })
    }

    const { immediate } = await request.json()

    if (immediate) {
      // Cancel immediately
      await prisma.subscription.update({
        where: { userId: user.id },
        data: {
          status: 'cancelled',
          cancelAtPeriodEnd: false,
        },
      })

      await prisma.user.update({
        where: { id: user.id },
        data: { subscriptionStatus: 'none' },
      })
    } else {
      // Cancel at period end
      await prisma.subscription.update({
        where: { userId: user.id },
        data: { cancelAtPeriodEnd: true },
      })
    }

    return NextResponse.json({ 
      success: true,
      message: immediate ? 'Subscription cancelled immediately' : 'Subscription will cancel at period end'
    })
  } catch (error) {
    console.error('Error cancelling subscription:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
