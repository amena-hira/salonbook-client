import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';
import { auth } from '@/lib/auth';



export async function POST(request) {
  try {
    const headersList = await headers()
    const userSession = await auth.api.getSession({ headers: headersList })

    if (!userSession?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const service = String(formData.get('service') || 'Salon appointment').trim()
    const appointmentId = String(formData.get('appointmentId') || '')
    const price = Number(formData.get('price'))
    const unitAmount = Math.round(price * 100)

    if (!Number.isFinite(unitAmount) || unitAmount <= 0) {
      return NextResponse.json({ error: "Invalid service price" }, { status: 400 })
    }

    const origin = headersList.get('origin') || new URL(request.url).origin
    const successUrl = new URL('/checkout/success', origin)
    successUrl.searchParams.set('session_id', '{CHECKOUT_SESSION_ID}')
    successUrl.searchParams.set('service', service)
    successUrl.searchParams.set('price', price.toFixed(2))
    if (appointmentId) successUrl.searchParams.set('appointmentId', appointmentId)

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: service },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: userSession?.user.email,
      metadata: {
        userId: userSession?.user.id ?? null,
        appointmentId,
      },
      success_url: successUrl.toString(),
      // Provide a name (for example, hosted_web_0001) to label this Checkout integration and measure its conversion independently
      integration_identifier: "salon_book_web_001",
    });
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err))
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
