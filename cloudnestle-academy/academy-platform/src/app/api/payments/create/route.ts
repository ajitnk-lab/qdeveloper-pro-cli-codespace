import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { razorpay } from '@/lib/razorpay'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { items } = await request.json()

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Calculate total amount
    const courses = await prisma.course.findMany({
      where: { id: { in: items.map((item: any) => item.courseId) } },
    })

    const totalAmount = courses.reduce((sum, course) => sum + course.price, 0)

    // Create order in database
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        totalAmount,
        status: 'pending',
        items: {
          create: courses.map(course => ({
            courseId: course.id,
            price: course.price,
          })),
        },
      },
    })

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100), // Convert to paise
      currency: 'INR',
      receipt: order.id,
    })

    // Update order with payment ID
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentId: razorpayOrder.id },
    })

    return NextResponse.json({
      orderId: order.id,
      razorpayOrderId: razorpayOrder.id,
      amount: totalAmount,
      currency: 'INR',
    })
  } catch (error) {
    console.error('Error creating payment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
